import { gql } from '@apollo/client/core';

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($documentId: ID!, $data: OrderInput!) {
    updateOrder(documentId: $documentId, data: $data) {
      documentId
      order_status
    }
  }
`;