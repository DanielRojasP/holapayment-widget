import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { loadScript, PayPalButtonsComponent } from '@paypal/paypal-js';
import { ApolloClient } from '@apollo/client/core';
import { createApolloClient } from '../../lib/apollo';
import { CREATE_ORDER_MUTATION } from '../../graphql/create_order';
import tailwindStyles from '../../styles.css?inline';

@customElement('payment-paypal')
export class PaymentPaypal extends LitElement {
  static styles = unsafeCSS(tailwindStyles);

  @property({ type: Number }) amount = 0;
  @property({ type: String }) currency = 'USD';
  @property({ type: String, attribute: 'graphql-url' }) graphqlUrl = '';
  @property({ type: String, attribute: 'client-id' }) clientId = '';
  @property({ type: String, attribute: 'customer-email' }) customerEmail = '';

  @state() private loading = true;
  @state() private errorMsg = '';

  private apolloClient!: ApolloClient;
  private paypalButtons: PayPalButtonsComponent | null = null;

  async firstUpdated() {
    // Inicializar Apollo Client con el endpoint configurado
    if (this.graphqlUrl) {
      this.apolloClient = createApolloClient(this.graphqlUrl);
    }
    await this.initPayPalSDK();
  }

  private async createStrapiOrder(): Promise<string> {
    if (!this.apolloClient) {
      throw new Error('La URL de GraphQL no está configurada.');
    }

    // Ejecución con Apollo Client Core
    const result = await this.apolloClient.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: {
        input: {
          amount: this.amount,
          currency: this.currency,
          paymentMethod: 'paypal',
          customerEmail: this.customerEmail,
        },
      },
    });

    const data = result.data?.createOrder;
    if (!data?.paypalOrderId) {
      throw new Error('No se pudo generar el ID de la orden de PayPal.');
    }

    return data.paypalOrderId;
  }

  private async initPayPalSDK() {
    try {
      const paypal = await loadScript({
        clientId: this.clientId,
        currency: this.currency,
      });

      if (!paypal || !paypal.Buttons) {
        throw new Error('No se pudo cargar el SDK de PayPal');
      }

      const container = this.shadowRoot?.querySelector('#paypal-container') as HTMLElement;

      this.paypalButtons = paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect' },

        createOrder: () => {
          return this.createStrapiOrder();
        },

        onApprove: async (data: any) => {
          this.dispatchEvent(
            new CustomEvent('payment-submit', {
              detail: {
                method: 'paypal',
                payload: { paypalOrderId: data.orderID },
              },
              bubbles: true,
              composed: true,
            })
          );
        },

        onError: (err: any) => {
          this.errorMsg = 'Error al procesar el pago con PayPal.';
          console.error('PayPal Error:', err);
        },
      });

      if (container) {
        await this.paypalButtons.render(container);
      }
    } catch (err) {
      this.errorMsg = err instanceof Error ? err.message : 'Error al inicializar PayPal';
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="p-4 border border-slate-200 rounded-xl bg-slate-50 font-sans space-y-3">
        <h4 class="font-semibold text-slate-700 text-sm">Pagar con PayPal</h4>
        ${this.loading ? html`<p class="text-xs text-blue-600 animate-pulse">Cargando pasarela...</p>` : null}
        ${this.errorMsg ? html`<p class="text-xs text-red-600">${this.errorMsg}</p>` : null}
        <div id="paypal-container" class="${this.loading ? 'hidden' : ''}"></div>
      </div>
    `;
  }
}