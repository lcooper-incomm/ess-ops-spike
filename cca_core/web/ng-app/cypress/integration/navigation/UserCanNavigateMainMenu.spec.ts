describe('User can navigate the CCA Main Menu.', () => {

  before(() => {
    cy.clearCookies()
    cy.visit('/login')
    cy.get('#login-username input').clear().type('cca_admin')
    cy.get('#login-password input').clear().type('Eu6B45Voh9',{log: false})
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
  })

  it('The Dashboard should contain specific Menu Items.', () => {
    cy.get('#dashboard-nav-button').should('be.visible');
    cy.get('#case-workspace-nav-button').should('be.visible')
    cy.get('#search-nav-button').should('be.visible');
    cy.get('#search-menu-trigger').should('be.visible');
    cy.get('#reports-nav-button').should('be.visible');
    cy.get('#reports-menu-trigger').should('be.visible');
    cy.get('#control-panel-nav-button').should('be.visible');
    cy.get('#control-panel-trigger').should('be.visible');
    cy.get('#profile-nav-button > .user-chip').should('be.visible');
    cy.get('#create-session-button').should('be.visible');
    cy.get('#user-menu-button').should('be.visible');
  })

  it('The Session Manager should be available', () => {
    cy.get('#dashboard-nav-button').click()
    cy.get('cca-dock')
  })
})
