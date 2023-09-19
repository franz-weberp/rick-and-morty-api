import { GraphQLClient } from 'graphql-request'

export function createClientRequest (endpoint, query) {
  const clientRequest = new GraphQLClient(endpoint, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  return clientRequest
}