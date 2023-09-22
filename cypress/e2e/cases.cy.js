// https://on.cypress.io/api

describe('Character Search', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql').as('getCharacters')
    cy.visit('/')
  })

  it('1. Test the initial loading of characters when the page is first loaded', () => {
    cy.wait('@getCharacters')
    cy.get('.character-list .character')
      .each(($el) => {
        cy.wrap($el)
          .find('p.bold')
          .should('not.be.empty')
      })
  })

  it('2. Test the loading of characters when a new name is entered in the input field', ()=> {
    cy.wait('@getCharacters')
    
    const characters = ['Rick', 'Morty', 'Summer', 'Beth', 'Jerry', 'Alien']
    characters.forEach((character)=> {
      cy.get('input[name="name-character"]')
        .type(character)

      cy.wait('@getCharacters')

      cy.get('.character-list .character')
        .should('have.length.greaterThan', 0) 

      cy.get('.character-list .character')
        .each(($el, index, $list) => {
          cy.get($el).find('p.bold').should('contain.text', character)
        }
      )
        
      cy.get('input[name="name-character"]').clear()
      cy.wait('@getCharacters')
    })
  })

  it('2.1 Test displays a message when a character is not found', () => {
    cy.wait('@getCharacters')
    cy.get('input[name="name-character"]').type('dkgkdifhiobiehrb')
    cy.wait('@getCharacters')
    cy.get('.empty.-text').should('be.visible').and('have.text', 'No characters with that name were found... Try another one')
  })
  
  it('3. Test the loading of characters when a new status is selected from the dropdown', () => {
    const statuses = ['Alive', 'Dead', 'Unknown']
    const classes = ['-alive', '-dead', '-unknown']
    const texts = ['Alive - ', 'Dead - ', 'unknown - ']

    statuses.forEach((status, index) => {
      cy.get('select[name="status"]').select(status)
      cy.wait('@getCharacters')

      cy.get('.character-list .character').each(($character) => {
        cy.wrap($character)
          .find('.character-name .sub .icon')
          .should('have.class', classes[index])
        cy.wrap($character)
          .find('.character-name .sub')
          .should('contain.text', texts[index])
      })
    })
  })

  it('4. Test the base pagination functionality', () => {
    cy.wait('@getCharacters')

    cy.get('.pagination .page').should('contain', 'Page 1 -')
    cy.get('.pagination button').contains('Next').click()

    cy.wait('@getCharacters')

    cy.get('.pagination .page').should('contain', 'Page 2 -')
    cy.get('.pagination button').contains('Previous').click()
    
    cy.wait('@getCharacters')

    cy.get('.pagination .page').should('contain', 'Page 1 -')
  })

  it('4.1 Test the pagination previous and next disabled feature', () => {
    cy.wait('@getCharacters')

    cy.get('.pagination > :nth-child(1)').should('be.disabled')
    cy.get('.pagination .page').should('contain', 'Page 1 -')
    cy.get('.pagination > :nth-child(3)').click()

    cy.wait('@getCharacters')
  
    cy.get('.pagination > :nth-child(1)').should('not.be.disabled')
    cy.get('.pagination .page').should('not.contain', 'Page 1 -')
    cy.get('.pagination > :nth-child(3)').as('nextButton')

    let safetyCounter = 0
    while (safetyCounter < 50) {
      cy.get('@nextButton').then(($nextButton) => {
        if (!$nextButton.is(':disabled')) { cy.get('@nextButton').click() }
      })
      safetyCounter++
    }

    cy.get('@nextButton').should('be.disabled')
    cy.get('.pagination .page').should('contain', 'Page 42 - 42')
  })
  
  it('5. Complex test case using all features all ready tested', () => {
    cy.wait('@getCharacters')

    cy.get('.character-list .character').each(($el) => {
      cy.wrap($el).find('p.bold').should('not.be.empty')
    })

    cy.get('input[name="name-character"]').type('Rick')

    cy.wait('@getCharacters')

    cy.get('.character-list .character').should('have.length.greaterThan', 0)

    cy.get('.character-list .character').each(($el) => {
      cy.wrap($el).find('p.bold').should('contain.text', 'Rick')
    })

    cy.get('select[name="status"]').select('Unknown')

    cy.wait('@getCharacters')

    cy.get('.character-list .character').each(($character) => {
      cy.wrap($character).find('.character-name .sub').should('contain.text', 'unknown - ')
    })

    cy.get('.pagination > :nth-child(1)').should('be.disabled')
    cy.get('.pagination .page').should('contain', 'Page 1 -')
    cy.get('.pagination > :nth-child(3)').click()

    cy.wait('@getCharacters')

    cy.get('.pagination > :nth-child(1)').should('not.be.disabled')
    cy.get('.pagination > :nth-child(3)').should('be.disabled')
    cy.get('select[name="status"]').select('Alive')

    cy.wait('@getCharacters')

    cy.get('.character-list .character').each(($character) => {
      cy.wrap($character).find('.character-name .sub').should('contain.text', 'Alive - ')
    })

    cy.get('input[name="name-character"]').type('dkgkdifhiobiehrb')

    cy.wait('@getCharacters')

    cy.get('.empty.-text')
      .should('be.visible')
      .and('have.text', 'No characters with that name were found... Try another one')

    cy.get('input[name="name-character"]').clear()
    cy.wait('@getCharacters')
    cy.get('.character-list .character').each(($el) => {
      cy.wrap($el).find('p.bold').should('not.be.empty')
    })
  })
})
