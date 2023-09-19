// https://on.cypress.io/api

describe('Character List', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('POST', '/graphql', (req) => {
      req.reply({
        data: {
          // Mocked data
        }
      })
    })
  })

  // Component Testing
  it('renders the character list correctly', () => {
    cy.get('.character').should('have.length', 20)
    cy.get('.character').first().within(() => {
      cy.get('img').should('have.attr', 'src')
      cy.get('h2').contains('Character Name')
      cy.get('p').contains('Character Status - Character Species')
      cy.get('p').contains('Last known location:')
      cy.get('p').contains('Location Name')
      cy.get('p').contains('First Seen in:')
      cy.get('p').contains('Episode Name')
    })
  })

  it('updates the character name input field value', () => {
    cy.get('[name="name-character"]').type('Rick')
    cy.get('[name="name-character"]').should('have.value', 'Rick')
  })

  it('updates the character status select field value', () => {
    cy.get('[name="status"]').select('Alive')
    cy.get('[name="status"]').should('have.value', 'Alive')
  })

  it('disables/enables the "Previous" and "Next" buttons correctly', () => {
    cy.get('[disabled]').should('contain', 'Previous')
    cy.get(':not([disabled])').should('contain', 'Next')

    // Assuming we're on page 2 now
    cy.get(':not([disabled])').should('contain', 'Previous')
    cy.get(':not([disabled])').should('contain', 'Next')

    // Assuming we're on the last page now
    cy.get(':not([disabled])').should('contain', 'Previous')
    cy.get('[disabled]').should('contain', 'Next')
  })

  // Integration Testing
  it('loads characters when the page is first loaded', () => {
    // Assuming mocked data contains 20 characters
    cy.get('.character').should('have.length', 20)
  })

  it('loads characters when a new name is entered in the input field', () => {
    cy.get('[name="name-character"]').type('{backspace}{backspace}{backspace}{backspace}Morty{enter}')
    
    // Assuming mocked data contains 5 characters named Morty
    cy.get('.character').should('have.length', 5)
  })

  it('loads characters when a new status is selected from the dropdown', () => {
    cy.get('[name="status"]').select('Dead')

    // Assuming mocked data contains 8 dead characters
    cy.get('.character').should('have.length', 8)
  })

  it('loads new set of characters and updates the page number when "Next" is clicked', () => {
    cy.contains('Next').click()

    // Assuming mocked data contains a different set of characters for page 2
    // Check for a character that only exists on page 2
    cy.contains('.character h2', 'Page 2 Character Name')

    // Check that the page number has been incremented
    cy.contains(/^Page \d+$/).should(($div) => {
      const text = $div.text()
      expect(text).to.match(/^Page \d+$/)
      const pageNum = parseInt(text.replace(/^Page /, ''))
      expect(pageNum).to.eq(2)
    })
  })

  it('loads previous set of characters and updates the page number when "Previous" is clicked', () => {
    // Assuming we're on page 2 now
    cy.contains('Previous').click()

    // Assuming mocked data contains a different set of characters for page 1
    // Check for a character that only exists on page 1
    cy.contains('.character h2', 'Page 1 Character Name')

    // Check that the page number has been decremented
    cy.contains(/^Page \d+$/).should(($div) => {
      const text = $div.text()
      expect(text).to.match(/^Page \d+$/)
      const pageNum = parseInt(text.replace(/^Page /, ''))
      expect(pageNum).to.eq(1)
    })
  })
})