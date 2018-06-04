context('Local Storage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  // Although local storage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear the local storage manually

  it('cy.clearLocalStorage() - clear all data in local storage', () => {

    // clearLocalStorage() yields the localStorage object
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem('token')).to.be.null
    })

    cy.visit('http://localhost:3000/login')

    cy.get('.input-email')
      .type('espinozasenior@gmail.com').should('have.value', 'espinozasenior@gmail.com')

    cy.get('.input-password')
      .type('2486552').should('have.value', '2486552')

    cy.get('.login-form').submit()
    cy.wait(2000)
    cy.get('.box-header').find('h2').should('contain', 'Feed')

  })

})