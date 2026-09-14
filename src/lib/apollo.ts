// src/lib/apollo.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export const createApolloClient = (graphqlUrl: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: graphqlUrl,
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
      // Si requieres enviar tokens/headers de Strapi:
      /* headers: {
        Authorization: `Bearer ${token}`
      } */
    }),
    cache: new InMemoryCache(),
  });
};