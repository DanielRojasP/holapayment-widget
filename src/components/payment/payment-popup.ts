import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwindStyles from '../../styles.css?inline';
import type { PaymentMethod, PaymentSuccessDetail, PaymentErrorDetail } from '../../types/paymentMethod';

@customElement('payment-popup')
export class PaymentPopup extends LitElement {
  static styles = unsafeCSS(tailwindStyles);

  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) amount: string = '0';
  @property({ type: String }) currency: string = 'CRC';
  @property({ type: String, attribute: 'backend-url' }) backendUrl: string = '';

  @state() private loading: boolean = false;

  private handleClose(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent('payment-cancelled', { bubbles: true, composed: true }));
  }

  private async handleSelectPayment(method: PaymentMethod): Promise<void> {
    this.loading = true;

    try {
      if (this.backendUrl) {
        const response = await fetch(`${this.backendUrl}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method, amount: this.amount, currency: this.currency }),
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

  render() {
    if (!this.open) return null;

    return html`
      <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-4 font-sans">
        <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative border border-slate-100">
          
          <button 
            @click="${this.handleClose}"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>

          <div class="text-center mb-6">
            <h3 class="text-lg font-bold text-slate-800">Finalizar Pago</h3>
            <p class="text-sm text-slate-500 mt-1">Selecciona una opción</p>
            <div class="text-3xl font-extrabold text-blue-600 mt-3">
              ${this.currency} ${this.amount}
            </div>
          </div>

          <div class="space-y-3">
            <button
              ?disabled="${this.loading}"
              @click="${() => this.handleSelectPayment('card')}"
              class="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all font-medium text-slate-700 disabled:opacity-50"
            >
              <div class="flex items-center space-x-3">
                <span>💳</span>
                <span>Tarjeta Débito / Crédito</span>
              </div>
              <span>→</span>
            </button>

            <button
              ?disabled="${this.loading}"
              @click="${() => this.handleSelectPayment('sinpe')}"
              class="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all font-medium text-slate-700 disabled:opacity-50"
            >
              <div class="flex items-center space-x-3">
                <span>📱</span>
                <span>SINPE Móvil</span>
              </div>
              <span>→</span>
            </button>

            <button
              ?disabled="${this.loading}"
              @click="${() => this.handleSelectPayment('paypal')}"
              class="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all font-medium text-slate-700 disabled:opacity-50"
            >
              <div class="flex items-center space-x-3">
                <span>🅿️</span>
                <span>PayPal</span>
              </div>
              <span>→</span>
            </button>
          </div>

          ${this.loading ? html`<p class="text-center text-xs text-blue-600 mt-4 animate-pulse">Procesando solicitud...</p>` : null}
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