
class CarritoPage {

  // Agregar el primer producto con stock
  agregarProductoConStock() {
    cy.get('.product-card').not('.out-of-stock').first().within(() => {
      cy.contains('Añadir al carrito').click();
    });
  }

  // Agregar el primer producto sin stock
  agregarProductoSinStock() {
    cy.get('.product-card.out-of-stock').first().within(() => {
      cy.contains('Añadir al carrito').click();
    });
  }

  // Verificar que un producto esté en el carrito
  verificarProductoEnCarrito(nombreProducto) {
    cy.get('#cart').should('contain', nombreProducto);
  }

  // Verificar que un producto NO esté en el carrito
  verificarProductoNoEnCarrito(nombreProducto) {
    cy.get('#cart').should('not.contain', nombreProducto);
  }

  // Aplicar código de descuento
  aplicarCodigoDescuento(codigo) {
    cy.get('#discount-code').clear().type(codigo);
    cy.get('#apply-discount').click();
  }

  // Verificar mensaje de cupón
  verificarMensaje(mensaje) {
    cy.get('#discount-message').should('contain.text', mensaje);
  }

  // Eliminar un producto del carrito
  eliminarProducto() {
    cy.get('#cart').contains('Eliminar').click();
  }





  // Agregar un producto específico por nombre
  agregarProducto(nombreProducto) {
    cy.get('.product-card').not('.out-of-stock')
      .contains(nombreProducto)
      .parent()
      .within(() => {
        cy.contains('Añadir al carrito').click();
      });
  }

  agregarProductoConStock() {
    cy.get('.product-card').not('.out-of-stock').first().within(() => {
      cy.contains('Añadir al carrito').click();
    });
  }

  agregarProductoSinStock() {
    cy.get('.product-card.out-of-stock').first().within(() => {
      cy.contains('Añadir al carrito').click();
    });
  }

  verificarProductoEnCarrito(nombreProducto) {
    cy.get('#cart').should('contain', nombreProducto);
  }

  verificarProductoNoEnCarrito(nombreProducto) {
    cy.get('#cart').should('not.contain', nombreProducto);
  }

  aplicarCodigoDescuento(codigo) {
  cy.get('#discount-code').clear();
  if (codigo) {
    cy.get('#discount-code').type(codigo);
  }
  cy.get('#apply-discount').click();
}


  verificarMensaje(mensaje) {
    cy.get('#discount-message').should('contain.text', mensaje);
  }

  eliminarProducto(nombreProducto) {
    cy.get('#cart-items li')
      .contains(nombreProducto)
      .within(() => {
        cy.get('.remove').click();
      });
  }

  verificarTotal(valor) {
    cy.get('#total').should('have.text', `Total: ${valor}`);
  }
  

}

export default CarritoPage;






