import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { loadScript } from '@paypal/paypal-js';
import { ApolloClient } from '@apollo/client/core';
import { createApolloClient } from '../../lib/apollo';
import { CREATE_ORDER_MUTATION } from '../../graphql/create_order';
import { UPDATE_ORDER_MUTATION } from '../../graphql/update_order_status';
import tailwindStyles from '../../styles.css?inline';
import { i18n } from '../../lib/i18n';

@customElement('payment-paypal')
export class PaymentPaypal extends LitElement {
  static styles = [
    unsafeCSS(tailwindStyles),
    css`
      :host {
        display: block;
        width: 100%;
      }
      #paypal-buttons-container iframe {
        width: 100% !important;
        min-width: 100% !important;
      }
    `
  ];

  @property({ type: String }) lang = 'en';
  @property({ type: String }) client_name = '';
  @property({ type: String }) client_phone = '';
  @property({ type: String }) client_email = '';
  @property({ type: String }) product_name = '';  
  @property({ type: Number }) amount = 20;
  @property({ type: String }) currency = 'USD';
  @property({ type: String, attribute: 'graphql-url' }) graphqlUrl = 'http://localhost:1337/graphql';
  @property({ type: String, attribute: 'client-id' }) clientId = '';
  @property({ type: String, attribute: 'tour-operator-id' }) operator_documentId = 'si297rhfgezt3i1mfsgfkuxw';

  @state() private processing = false;
  @state() private errorMsg = '';
  @state() private buttonsRendered = false;

  private apolloClient!: ApolloClient;
  private currentOrderDocumentId: string | null = null;

willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('lang')) {
      i18n.setLanguage(this.lang);
    }
  }

  async firstUpdated() {
    if (this.graphqlUrl) {
      this.apolloClient = createApolloClient(this.graphqlUrl);
    }
  }

  private async createStrapiOrder(): Promise<{ orderId: string; paypalOrderId: string }> {
    if (!this.apolloClient) {
      throw new Error('La URL de GraphQL no está configurada.');
    }

    const result = await this.apolloClient.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: {
        data: {
          number: `PP-${Date.now()}`,
          total_amount: this.amount,
          currency: this.currency,
          payment_method: 'paypal',
          product_name: 'Pago con PayPal',
          client_name: this.client_name || '',
          client_phone: this.client_phone || '0000000000',
          client_email: this.client_email || 'test@example.com',
          tour_operator: this.operator_documentId || undefined,
          order_status: 'unpaid',
        },
      },
    });

    const data = (result.data as Record<string, any>)?.createOrder;
    const orderId = data?.documentId || data?.id;
    this.clientId = data?.paypal_client_id;
    console.log('Client ID from Strapi:', this.clientId);
    const paypalOrderId = data?.paypal_order_id || data?.paypalOrderId;

    if (!orderId || !paypalOrderId) {
      throw new Error('No se pudo generar el ID de la orden de PayPal en Strapi.');
    }

    this.currentOrderDocumentId = orderId;

    return { orderId, paypalOrderId };
  }

  private async updateStrapiOrderStatus(documentId: string, paypalPayerId: string): Promise<void> {
    if (!this.apolloClient) return;

    await this.apolloClient.mutate({
      mutation: UPDATE_ORDER_MUTATION,
      variables: {
        documentId,
        data: {
          order_status: 'paid',
        },
      },
    });
  }

  private async handlePaypalClick() {
    this.processing = true;
    this.errorMsg = '';

    try {
      // 1. Primero creamos la orden en Strapi para obtener el clientId y el paypalOrderId
      const { paypalOrderId } = await this.createStrapiOrder();

      if (!this.clientId) {
        throw new Error('Falta el Client ID de PayPal devuelto por Strapi.');
      }

      // 2. Ahora que tenemos este.clientId, cargamos el SDK de PayPal
      const paypal = await loadScript({
        clientId: this.clientId,
        currency: this.currency,
      });

      if (!paypal || !paypal.Buttons) {
        throw new Error('No se pudo cargar el SDK de PayPal');
      }

      const container = this.shadowRoot?.querySelector('#paypal-buttons-container') as HTMLElement;
      if (!container) return;

      container.innerHTML = '';

      // 3. Renderizamos los botones pasando directamente el paypalOrderId ya generado
      await paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          tagline: false
        },

        createOrder: async () => {
          return paypalOrderId;
        },

        onApprove: async (data) => {
          this.processing = true;
          try {
            if (this.currentOrderDocumentId) {
              await this.updateStrapiOrderStatus(this.currentOrderDocumentId, data.payerID || '');
            }

            this.dispatchEvent(
              new CustomEvent('payment-submit', {
                detail: {
                  method: 'paypal',
                  payload: {
                    orderId: this.currentOrderDocumentId,
                    paypalOrderId: data.orderID,
                    payerId: data.payerID
                  },
                },
                bubbles: true,
                composed: true,
              })
            );
          } catch (err) {
            console.error('[Update Order Error]:', err);
          } finally {
            this.processing = false;
          }
        },

        onError: (err) => {
          this.errorMsg = 'Error durante el procesamiento del pago en PayPal.';
          console.error('[PayPal SDK Error]:', err);
        },
      }).render(container);

      this.buttonsRendered = true;
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : 'Error al procesar el pago con PayPal';
    } finally {
      this.processing = false;
    }
  }

  render() {
    return html`
      <div class="p-4 border border-slate-200 rounded-2xl bg-slate-50 font-sans space-y-3 w-full box-border">
        

        ${this.errorMsg ? html`<p class="text-xs text-red-600 font-medium">${this.errorMsg}</p>` : null}

        ${!this.buttonsRendered
          ? html`
              <button
                type="button"
                @click="${this.handlePaypalClick}"
                ?disabled="${this.processing}"
                class="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
              >
                ${this.processing
                  ? html`<span class="animate-pulse">${i18n.t('paypal.loading')}</span>`
                  : html`<span>${i18n.t('paypal.loadOptions')}</span>`}
              </button>
            `
          : null}

        <div id="paypal-buttons-container" class="w-full min-h-[100px]"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-paypal': PaymentPaypal;
  }
}