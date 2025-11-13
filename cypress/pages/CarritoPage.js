class CarritoPage {
  // Agregar el primer producto con stock
  agregarProductoConStock() {
    cy.get('.product-card').not('.out-of-stock').first().within(() => {
      cy.contains('Añadir al carrito').click();
    });
    // Esperar a que se refleje en el carrito
    cy.get('#cart-items li').should('have.length.greaterThan', 0);
  }

  // Agregar el primer producto sin stock
  agregarProductoSinStock() {
    cy.get('.product-card.out-of-stock').first().within(() => {
      cy.contains('Añadir al carrito').click();
    });
    // Verificar mensaje de stock
    cy.get('#discount-message').should('contain.text', 'Producto no disponible');
    // Verificar que no se haya agregado al carrito
    cy.get('#cart-items').should('be.empty');
  }

  // Agregar un producto específico por nombre
  agregarProducto(nombreProducto) {
    cy.get('.product-card').contains(nombreProducto).parents('.product-card').within(() => {
      cy.contains('Añadir al carrito').click();
    });
    cy.get('#cart-items li').should('contain.text', nombreProducto);
  }

  // Verificar que un producto esté en el carrito
  verificarProductoEnCarrito(nombreProducto) {
    cy.get('#cart-items li').should('contain.text', nombreProducto);
  }

  // Verificar que un producto NO esté en el carrito
  verificarProductoNoEnCarrito(nombreProducto) {
    cy.get('#cart-items').then($el => {
      if ($el.find('li').length) {
        cy.get('#cart-items li').should('not.contain.text', nombreProducto);
      } else {
        cy.get('#cart-items').should('be.empty');
      }
    });
  }

  // Aplicar código de descuento
  aplicarCodigoDescuento(codigo) {
    cy.get('#discount-code').clear();
    if (codigo) cy.get('#discount-code').type(codigo);
    cy.get('#apply-discount').click();
  }

  // Verificar mensaje (cupón o stock)
  verificarMensaje(mensaje) {
    cy.get('#discount-message').should('contain.text', mensaje);
  }

  // Eliminar un producto del carrito (por nombre)
  eliminarProducto(nombreProducto) {
    // ✅ Corregido: hacemos 'within' directamente en el <li> correcto
    cy.get('#cart-items li').contains(nombreProducto).should('exist').within(() => {
      cy.get('.remove').click();
    });
    cy.get('#cart-items').should('not.contain.text', nombreProducto);
  }

  // Verificar total del carrito
  verificarTotal(valor) {
    const totalFormateado = `$${valor}`;
    cy.get('#total').should('contain.text', `Total: ${totalFormateado}`);
  }
}

export default CarritoPage;





