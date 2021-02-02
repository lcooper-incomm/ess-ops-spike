describe('User can navigate to the CCA Profile Screen.', () => {

  before(() => {
    cy.clearCookies()
    cy.visit('/')
    cy.get('#login-username input').clear().type('cca_admin')
    cy.get('#login-password input').clear().type('Eu6B45Voh9', {log: false})
    cy.get('#login-button').click()
    cy.get('cca-transition')
  })

  after(() => {
    cy.get('.main-navigation > #user-menu-button').click()
    cy.get('#sign-out-button > div > div:nth-child(2)').click()
    cy.url().should('include', '/login')
    cy.clearCookies()
  })

  it('Should be at CCA Dashboard after Sign On.', () => {
    cy.url().should('include', '/dashboard')
  })

  it('User can navigate to the CCA Profile Screen, and the Profile screen displays correctly.', () => {
    cy.get('#profile-nav-button > .user-chip').click()
    cy.url().should('include', '/profile')
    cy.get('[key="Username"] > cca-key-value > .key-value-container > .value-container').contains('cca_admin')
    cy.get('[data-test-id=profile-panel]').should('be.visible')
    cy.get('[data-test-id=preferences-panel]').should('be.visible')
    cy.get('[data-test-id=groups-panel]').scrollIntoView().should('be.visible')
    cy.get('[data-test-id=roles-panel]').should('be.visible')
    cy.get('[data-test-id=permissions-panel]').should('be.visible')
  })

})
