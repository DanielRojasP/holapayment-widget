import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwindStyles from '../../styles.css?inline';
import type { PaymentMethod, PaymentSuccessDetail, PaymentErrorDetail } from '../../types/paymentMethod';

import '../paypal';
import '../sinpe';
import '../card';

@customElement('payment-popup')
export class PaymentPopup extends LitElement {
  static styles = [
    unsafeCSS(tailwindStyles),
    css`
      :host {
        display: block;
      }
      /* Animación suave de aparición */
      @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .animate-modal {
        animation: modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) lang: string = 'en';
  @property({ type: String }) operator_documentId: string = '';
  @property({ type: String }) client_name: string = '';
  @property({ type: String }) client_phone: string = '';
  @property({ type: String }) client_email: string = '';
  @property({ type: String }) product_name: string = '';
  @property({ type: Number }) amount: number = 0.0;
  @property({ type: String }) currency: string = 'USD';
  @property({ type: String, attribute: 'backend-url' }) backendUrl: string = '';

  @state() private selectedMethod: PaymentMethod | null = null;
  @state() private loading: boolean = false;

  private handleClose(): void {
    this.open = false;
    this.selectedMethod = null;
    this.dispatchEvent(new CustomEvent('payment-cancelled', { bubbles: true, composed: true }));
  }

  private async handlePaymentSubmit(e: CustomEvent<{ method: PaymentMethod; payload: Record<string, unknown> }>): Promise<void> {
    const { method, payload } = e.detail;
    this.loading = true;

    try {
      if (this.backendUrl) {
        const response = await fetch(`${this.backendUrl}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method, amount: this.amount, currency: this.currency, ...payload }),
        });

        if (!response.ok) throw new Error('Error procesando la transacción');
      }

      const detail: PaymentSuccessDetail = {
        method,
        amount: this.amount,
        currency: this.currency,
        transactionId: `TX-${Date.now()}`
      };

      this.dispatchEvent(
        new CustomEvent<PaymentSuccessDetail>('payment-success', {
          detail,
          bubbles: true,
          composed: true,
        })
      );
      this.open = false;
      this.selectedMethod = null;
    } catch (err) {
      const errorDetail: PaymentErrorDetail = {
        code: 'PAYMENT_FAILED',
        message: err instanceof Error ? err.message : 'Error en la operación',
      };

      this.dispatchEvent(
        new CustomEvent<PaymentErrorDetail>('payment-error', {
          detail: errorDetail,
          bubbles: true,
          composed: true,
        })
      );
    } finally {
      this.loading = false;
    }
  }

  renderMethodForm() {
    switch (this.selectedMethod) {
      case 'card':
        return html`<payment-card .loading="${this.loading}" @payment-submit="${this.handlePaymentSubmit}"></payment-card>`;
      case 'sinpe':
        return html`<payment-sinpe .loading="${this.loading}" @payment-submit="${this.handlePaymentSubmit}"></payment-sinpe>`;
      case 'paypal':
        return html`
          <payment-paypal 
            .operator_documentId="${this.operator_documentId}"
            .lang="${this.lang}"
            .client_name="${this.client_name}"
            .client_phone="${this.client_phone}"
            .client_email="${this.client_email}"
            .product_name="${this.product_name}"
            .amount="${Number(this.amount)}"
            .currency="${this.currency}"
            .loading="${this.loading}"
            @payment-submit="${this.handlePaymentSubmit}"
          ></payment-paypal>
        `;
      default:
        return null;
    }
  }

  render() {
    if (!this.open) return null;

    return html`
      <!-- Backdrop con scroll seguro para pantallas pequeñas -->
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-[99999] p-3 sm:p-6 overflow-y-auto">
        
        <div class="animate-modal bg-white rounded-3xl p-5 sm:p-7 w-full max-w-md shadow-2xl relative border border-slate-100 my-auto overflow-hidden">
          
          <!-- Botón Cerrar -->
          <button 
            @click="${this.handleClose}"
            aria-label="Cerrar modal"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 rounded-full p-2 hover:bg-slate-100 transition-all flex items-center justify-center w-8 h-8 font-bold"
          >
            ✕
          </button>

          <!-- Encabezado y Monto -->
          <div class="text-center mb-6 pt-1">
            <span class="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-md font-semibold tracking-wide uppercase mb-2">
              Selecciona tu método de pago
            </span>
            <div class="flex items-center justify-center gap-1.5 mt-2 text-gray-400">
              <svg
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 1 5.25 5.25v3h.75A2.25 2.25 0 0 1 20.25 12v8.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V12A2.25 2.25 0 0 1 6 9.75h.75v-3A5.25 5.25 0 0 1 12 1.5Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-xs sm:text-sm font-small ">
                Pago 100% seguro y protegido
              </span>
            </div>
           
          </div>

         <!-- PAYMENT METHODS -->
          <div class="space-y-3">

            <!-- CREDIT / DEBIT CARD -->
            <button
              type="button"
              @click="${() => {
        this.selectedMethod =
          this.selectedMethod === 'card' ? null : 'card';
      }}"
              class="
                group
                w-full
                text-left
                rounded-xl
                border
                transition-all
                duration-200
                p-4
                ${this.selectedMethod === 'card'
        ? 'border-teal-500 bg-teal-50/40 shadow-sm ring-1 ring-teal-500'
        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}
              "
            >
              <!-- HEADER CARD -->
              <div class="flex items-center justify-between">

                <div class="flex items-center gap-3">

                  <!-- VISA / MASTERCARD -->
                  <div class="flex items-center gap-1">

                    <span
                      class="text-blue-700 font-bold italic text-sm"
                    >
                      VISA
                    </span>

                    <span class="relative flex w-7 h-5">
                      <span
                        class="absolute left-0 top-0 w-5 h-5 rounded-full bg-red-500/90"
                      ></span>

                      <span
                        class="absolute left-2 top-0 w-5 h-5 rounded-full bg-yellow-400/90"
                      ></span>
                    </span>

                  </div>

                  <div>
                    <div class="text-sm font-medium text-slate-800">
                      Tarjeta de Crédito / Débito
                    </div>

                    <div class="text-xs text-slate-400 mt-0.5">
                      Visa, Mastercard y más
                    </div>
                  </div>

                </div>

                <!-- CHECK -->
                <div
                  class="
                    w-5
                    h-5
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition-all
                    ${this.selectedMethod === 'card'
        ? 'bg-teal-600 border-teal-600 text-white'
        : 'border-slate-300'}
                  "
                >
                  ${this.selectedMethod === 'card'
        ? html`
                        <svg
                          class="w-3 h-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      `
        : null}
                </div>

              </div>

              <!-- CARD FORM -->
              ${this.selectedMethod === 'card'
        ? html`
                    <div
                      class="mt-4 pt-4 border-t border-teal-100"
                      @click="${(e: Event) => e.stopPropagation()}"
                    >
                      ${this.renderMethodForm()}
                    </div>
                  `
        : null}

            </button>


            <!-- PAYPAL -->
            <button
              type="button"
              @click="${() => {
        this.selectedMethod =
          this.selectedMethod === 'paypal' ? null : 'paypal';
      }}"
              class="
                group
                w-full
                flex
                items-center
                justify-between
                p-4
                rounded-xl
                border
                transition-all
                duration-200
                text-left
                ${this.selectedMethod === 'paypal'
        ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}
              "
            >

              <div class="flex items-center gap-3">

                <!-- PAYPAL LOGO -->
                <div
                  class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
                >
                  <span
                    class="text-blue-700 font-extrabold text-2xl italic"
                  >
                    P
                  </span>
                </div>

                <div>
                  <div class="text-sm font-medium text-slate-800">
                    PayPal
                  </div>

                  <div class="text-xs text-slate-400 mt-0.5">
                    Paga de forma rápida y segura
                  </div>
                </div>

              </div>

              <!-- RADIO -->
              <div
                class="
                  w-5
                  h-5
                  rounded-full
                  border
                  flex
                  items-center
                  justify-center
                  shrink-0
                  ${this.selectedMethod === 'paypal'
        ? 'bg-teal-600 border-teal-600 text-white'
        : 'border-slate-300'}
                "
              >
                ${this.selectedMethod === 'paypal'
        ? html` <svg
                          class="w-3 h-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                    `
        : null}
              </div>

            </button>


            <!-- PAYPAL FORM -->
            ${this.selectedMethod === 'paypal'
        ? html`
                  <div class="px-1">
                    ${this.renderMethodForm()}
                  </div>
                `
        : null}


            <!-- APPLE PAY -->
            <button
              type="button"
              class="
                group
                w-full
                flex
                items-center
                justify-between
                p-4
                rounded-xl
                border
                border-slate-200
                bg-white
                hover:border-slate-300
                hover:bg-slate-50
                transition-all
                duration-200
                text-left
              "
            >

              <div class="flex items-center gap-3">

                <!-- APPLE -->
                <div
                  class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.97.48 7.12-.57 1.5-1.31 2.99-2.54 4.1l.01-.01z"
                    />
                  </svg>
                </div>

                <div>
                  <div class="text-sm font-medium text-slate-800">
                    Apple Pay
                  </div>

                  <div class="text-xs text-slate-400 mt-0.5">
                    Paga con Touch ID o Face ID
                  </div>
                </div>

              </div>

              <div
                class="w-5 h-5 rounded-full border border-slate-300 shrink-0"
              ></div>

            </button>

          </div>


          <!-- PAY BUTTON -->
          <button
            type="button"
            ?disabled="${this.loading || !this.selectedMethod}"
            @click="${() => {
        // Aquí puedes disparar el pago cuando corresponda
      }}"
            class="
              w-full
              mt-5
              py-3
              px-4
              rounded-full
              bg-teal-600
              hover:bg-teal-700
              disabled:bg-slate-300
              disabled:cursor-not-allowed
              text-white
              text-sm
              font-medium
              transition-all
              shadow-sm
            "
          >
            ${this.loading
        ? 'Procesando...'
        : `Pagar ${this.currency} ${this.amount}`}
          </button>


          <!-- Estado de Carga Global -->
          ${this.loading
        ? html`
                <div class="mt-4 p-3 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center justify-center space-x-2 text-blue-700 text-xs font-medium animate-pulse">
                  <svg class="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Procesando pago seguro...</span>
                </div>
              `
        : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-popup': PaymentPopup;
  }
}