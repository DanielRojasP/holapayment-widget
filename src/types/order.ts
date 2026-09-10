// src/graphql/types.ts

export interface CreateOrderInput {
    number: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  customerEmail: string;
}

export interface CreateOrderResponse {
  createOrder: {
    number: string;
    orderId: string;
    paypalOrderId?: string;
    tilopayUrl?: string;
    status: string;
  };
}

export interface CreateOrderVariables {
  input: CreateOrderInput;
}