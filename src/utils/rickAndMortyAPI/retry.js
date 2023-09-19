export async function retry(requestEndopoint, maxRetries = 5, delay = 3000) {
  let retries = 0;

  while (retries < maxRetries) {
    try {  return await requestEndopoint() } 
    catch (error) {
      retries++

      if (retries < maxRetries) { await wait(delay) } 
      else { throw error }
    }
  }
}

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)) }