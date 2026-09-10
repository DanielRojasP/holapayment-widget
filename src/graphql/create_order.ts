import { gql } from '@apollo/client/core';

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      number
      product_name
      client_email
      total_amount
      currency
      payment_method
      paypal_approval_url
      paypal_order_id
      # Si incluyes una relación como tour_operator, DEBES seleccionar subcampos:
      tour_operator {
        documentId
        name
      }
    }
  }
`;