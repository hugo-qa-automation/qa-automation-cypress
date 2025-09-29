describe('Debug productos', () => {
  it('Debe mostrar las tarjetas de productos', () => {
    cy.visit('http://127.0.0.1:5500/app/index.html');
    cy.contains('Productos').should('be.visible'); // Valida el título
    cy.get('.product-card').should('have.length', 3); // Valida que hay 3 productos
  });
});
