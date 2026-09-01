// src/graphql/create_order.ts
import { gql } from '@apollo/client/core';

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      number
      payment_method
      tour_operator
      client_name
      client_email
      client_phone
      product_name
      total_amount
      currency
      status
    }
  }
`;

export const CAPTURE_PAYPAL_ORDER_MUTATION = gql`
  mutation CapturePaypalOrder($orderId: String!) {
    capturePaypalOrder(orderId: $orderId) {
      id
      order_status
    }
  }
`;