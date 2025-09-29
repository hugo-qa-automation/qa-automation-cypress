describe('TC0003 - Aplicar código de descuento válido', () => {
  it('El descuento se aplica correctamente', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-email').type('producto_para_cupon@example.com')
    cy.get('.action-btn').click()
    cy.get('.action-coupon').type('DESCUENTO10')
    cy.get('.apply-btn').click()

    cy.contains('10% de descuento aplicado').should('be.visible')
  })
})






describe('TC0004 - Código de descuento inválido', () => {
  it('Muestra mensaje de error y no aplica el cupón', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-email').type('producto_para_cupon@example.com')
    cy.get('.action-btn').click()
    cy.get('.action-coupon').type('CODIGO_INVALIDO')
    cy.get('.apply-btn').click()

    cy.contains('Código no válido').should('be.visible')
  })
})
