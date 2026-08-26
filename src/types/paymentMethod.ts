export type PaymentMethod = 'card' | 'sinpe' | 'paypal';

export interface PaymentSuccessDetail {
  method: PaymentMethod;
  amount: string;
  currency: string;
  transactionId?: string;
}

export interface PaymentErrorDetail {
  code: string;
  message: string;
}