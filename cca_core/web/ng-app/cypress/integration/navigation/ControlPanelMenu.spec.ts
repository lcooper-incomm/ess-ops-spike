describe('User can navigate to the Control Panel.', () => {
  const superMenu = 'div.cdk-overlay-container div.super-menu div.mat-menu-content'

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
  })

  it('User can navigate to the Control Panel.', () => {
    cy.get('.main-navigation').should('be.visible')
    cy.get('.main-navigation #control-panel-trigger').click()
    cy.get('.control-panel-menu').should('be.visible')
    cy.get(superMenu)
      .should('exist')
      .should('contain', 'Authorization')
      .should('contain', 'CCA Configuration')
      .should('contain', 'Data Mapping')
      .should('contain', 'I3/IVR Configuration')
      .should('contain', 'Other Configuration')
      .should('contain', 'Troubleshooting')
    cy.get('div.cdk-overlay-container').click()
    cy.get('div.cdk-overlay-container').should('be.empty')
    cy.get('.control-panel-menu').should('not.be.visible')
  })
})
