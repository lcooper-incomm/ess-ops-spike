describe('Dashboard displays correctly.', () => {

  before(() => {
    cy.clearCookies()
    cy.visit('/login')
    cy.get('#login-username input').clear().type('cca_admin')
    cy.get('#login-password input').clear().type('Eu6B45Voh9', {log: false})
    cy.get('#login-button').click()
    cy.get('cca-transition')
  })

  after(() => {
    cy.get('.main-navigation > #user-menu-button').click()
    cy.get('#sign-out-button > div > div:nth-child(2)').click()
    expect(cy.url().should('include', 'login'))
    cy.clearCookies();
  })

  it('Should be at CCA Dashboard after Sign On.', () => {
    cy.url().should('include', 'dashboard');
    cy.get('#dashboard-nav-button').click;
    cy.get('div.quick-search').should('be.visible')
    cy.get('div.quick-lookup').should('be.visible')
    cy.get('div.transfer-requests').should('be.visible')

  })
})

