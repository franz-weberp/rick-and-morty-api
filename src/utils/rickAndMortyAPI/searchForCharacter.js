import { gql } from 'graphql-request'
import { endpoint } from './config.js'
import { retry } from './retry.js'
import { createClientRequest } from './client.js'
import { queryCharacter } from './querySchema.js'

export async function searchForCharacter(queryType, filters) {
  const query = gql`${queryCharacter(queryType, filters)}`
  const client = createClientRequest(endpoint, query)

  const requestEndopoint = async () => {
    const data = await client.request(endpoint, query, queryType, filters)
    return data
  }

  try {
    const data = await retry(requestEndopoint)
    return data
  }

  catch (error) {
    if (error.message === 'Seems the API is offline right now')
    throw 'Error: ' + error
  }
}