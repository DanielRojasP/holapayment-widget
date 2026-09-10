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
  @property({ type: String }) amount: string = '20';
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
        
        <!-- Tarjeta Modal Adaptable -->
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
            <span class="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
              Resumen de Pago
            </span>
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              <span class="text-blue-600 text-2xl sm:text-3xl font-bold">${this.currency}</span> ${this.amount}
            </div>
          </div>

          <!-- Selección de Métodos -->
          ${!this.selectedMethod
            ? html`
                <div class="space-y-2.5">
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Selecciona un método</p>              

                  <!-- Opción PayPal -->
                  <button
                    @click="${() => this.selectedMethod = 'paypal'}"
                    class="group w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:bg-indigo-50/50 hover:border-indigo-500 transition-all duration-200 text-left shadow-sm hover:shadow"
                  >
                    <div class="flex items-center space-x-3.5">
                      <div class="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                        🅿️
                      </div>
                      <div>
                        <div class="font-semibold text-slate-800 text-sm group-hover:text-indigo-900">PayPal</div>
                        <div class="text-xs text-slate-400">Pago internacional seguro</div>
                      </div>
                    </div>
                    <span class="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all text-lg font-bold">→</span>
                  </button>
                </div>
              `
            : html`
                <div>
                  <button
                    @click="${() => this.selectedMethod = null}"
                    class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-4 px-2.5 py-1 rounded-lg hover:bg-slate-100"
                  >
                    <span>←</span> Cambiar método de pago
                  </button>
                  ${this.renderMethodForm()}
                </div>
              `}

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