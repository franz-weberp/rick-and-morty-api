function generateFilterString(filters) {
  return Object.entries(filters)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(', ')
}

export function queryCharacter(queryType, filters) {
  const filterString = generateFilterString(filters)
  
  return `query {
    characters( ${queryType} : { ${filterString} }) {
      info { pages }
      results { image name status species location { name } episode { name } }
    }
  }`
}