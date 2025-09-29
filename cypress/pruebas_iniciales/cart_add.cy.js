describe('Carrito de compras', () => {

  it('TC001 - Debe agregar el producto al carrito', () => {
    // 1. Visitar la página
    cy.visit('https://example.cypress.io/commands/actions') 
    // 👆 cámbialo por la URL de tu aplicación real

    // 2. Asegurarse que hay productos visibles
    cy.get('.product-card').should('be.visible')

    // 3. Click en "Agregar al carrito" aunque esté oculto
    cy.get('.btn-add-to-cart').first().click({ force: true })

    // 4. Validar mensaje de confirmación
    cy.contains('Contiene producto añadido').should('be.visible')

    // 5. Validar que el carrito muestra 1 producto
    cy.get('.cart-count').should('contain', '1')
  })
})




describe('TC0002 - Producto sin stock', () => {
  it('No debe permitir añadir producto', () => {
    cy.visit('https://example.cypress.io/commands/actions')
    cy.get('.action-email').type('producto_sin_stock@example.com')
    cy.get('.action-btn').click()

    // Validación ejemplo
    cy.contains('Producto no disponible').should('be.visible')
  })
})
