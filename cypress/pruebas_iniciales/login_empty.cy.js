describe('TC003 - Iniciar sesión con campos vacíos', () => {
  it('No debe permitir login si los campos están vacíos', () => {
    cy.visit('https://example.cypress.io/commands/actions') // sitio de prueba
    cy.get('.action-email') // no escribimos nada
    cy.get('.action-btn') // pulsar botón
      .click()

    // Validación: ejemplo en página de prueba
    cy.url().should('include', '/commands/actions')
    // En app real se esperaría:
    // cy.contains('Campo requerido').should('be.visible')
  })
})
