describe('TC002 - Iniciar sesión con usuario incorrecto', () => {
  it('No debe permitir login con credenciales inválidas', () => {
    cy.visit('https://example.cypress.io/commands/actions') // sitio de prueba
    cy.get('.action-email') // campo de email
      .type('usuario_incorrecto@example.com')
    cy.get('.action-btn') // botón de enviar
      .click()

    // Validación: como estamos en página de prueba, solo hacemos un ejemplo
    cy.url().should('include', '/commands/actions')
    // En una app real usarías:
    // cy.contains('Usuario incorrecto').should('be.visible')
  })
})
