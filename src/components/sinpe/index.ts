import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwindStyles from '../../styles.css?inline';

@customElement('payment-sinpe')
export class PaymentSinpe extends LitElement {
  static styles = unsafeCSS(tailwindStyles);

  @property({ type: Boolean }) loading = false;
  @state() private phone = '';
  @state() private reference = '';

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('payment-submit', {
        detail: { method: 'sinpe', payload: { phone: this.phone, reference: this.reference } },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}" class="space-y-3 p-3 border border-slate-200 rounded-xl bg-slate-50 font-sans">
        <h4 class="font-semibold text-slate-700 text-sm flex items-center gap-2">
          <span>📱</span> SINPE Móvil
        </h4>
        <input
          type="tel"
          placeholder="Número de teléfono"
          .value="${this.phone}"
         @input="${(e: Event) => this.phone = (e.target as HTMLInputElement).value}"
          class="w-full text-sm p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
          required
        />
        <input
          type="text"
          placeholder="Número de comprobante"
          .value="${this.reference}"
          @input="${(e: Event) => this.reference = (e.target as HTMLInputElement).value}"
          class="w-full text-sm p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
          required
        />
        <button
          type="submit"
          ?disabled="${this.loading}"
          class="w-full py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          Confirmar SINPE
        </button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-sinpe': PaymentSinpe;
  }
}