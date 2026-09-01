import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwindStyles from '../../styles.css?inline';

@customElement('payment-card')
export class PaymentCard extends LitElement {
  static styles = unsafeCSS(tailwindStyles);

  @property({ type: Boolean }) loading = false;
  @state() private cardNumber = '';

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('payment-submit', {
        detail: { method: 'card', payload: { cardNumber: this.cardNumber } },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}" class="space-y-3 p-3 border border-slate-200 rounded-xl bg-slate-50 font-sans">
        <h4 class="font-semibold text-slate-700 text-sm flex items-center gap-2">
          <span>💳</span> Tarjeta Débito / Crédito
        </h4>
        <input
          type="text"
          placeholder="Número de tarjeta"
          .value="${this.cardNumber}"
          @input="${(e: Event) => this.cardNumber = (e.target as HTMLInputElement).value}"
          class="w-full text-sm p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          ?disabled="${this.loading}"
          class="w-full py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Pagar con Tarjeta
        </button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-card': PaymentCard;
  }
}