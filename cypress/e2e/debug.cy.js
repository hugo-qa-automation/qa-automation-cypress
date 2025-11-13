describe('Debug productos', () => {
  const productosMock = [
    { id: 1, name: 'Producto 1', stock: 10, price: 10 },
    { id: 2, name: 'Producto 2', stock: 0, price: 15 },
    { id: 3, name: 'Producto 3', stock: 5, price: 20 }
    // Agrega más si quieres
  ];

  it('Debe mostrar las tarjetas de productos según la API o mock', () => {
    // Interceptar la llamada a la API y devolver mock
    cy.intercept('GET', 'http://localhost:4000/products', productosMock).as('getProducts');

    cy.visit('http://127.0.0.1:5501/app/index.html');

    // Esperar a que termine la llamada
    cy.wait('@getProducts');

    // Validar título
    cy.contains('Productos').should('be.visible');

    // Validar que la cantidad de tarjetas coincida con la del mock
    cy.get('.product-card').should('have.length', productosMock.length);

    // Opcional: verificar que los nombres de los productos se muestren
    productosMock.forEach(prod => {
      cy.get('.product-card').contains(prod.name).should('be.visible');
    });
  });
});
