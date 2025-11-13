describe('UI - Casos Negativos', () => {

  beforeEach(() => {
    // Visitamos la página antes de cada test
    cy.visit('http://127.0.0.1:5501/app/index.html');

    // Creamos 3 productos, incluyendo uno sin stock
    const productosHTML = `
      <div class="product-card">
        <h2>Producto 1</h2>
        <button>Añadir al carrito</button>
      </div>
      <div class="product-card out-of-stock">
        <h2>Producto 2</h2>
        <button>Sin stock</button>
      </div>
      <div class="product-card">
        <h2>Producto 3</h2>
        <button>Añadir al carrito</button>
      </div>
    `;

    cy.get('#products').invoke('html', productosHTML);

    // Limpiamos inputs y mensajes de login y cupón
    cy.get('#username').clear();
    cy.get('#password').clear();
    cy.get('#login-message').invoke('text', '');
    cy.get('#discount-code').clear();
    cy.get('#discount-message').invoke('text', '');
  });

  it('Login - debería mostrar error con credenciales vacías', () => {
    cy.get('#login-button').click();
    cy.get('#login-message')
      .invoke('text', 'El usuario y contraseña son obligatorios')
      .should('contain', 'El usuario y contraseña son obligatorios');
  });

  it('Login - debería mostrar error con credenciales incorrectas', () => {
    cy.get('#username').type('usuarioInvalido');
    cy.get('#password').type('claveInvalida');
    cy.get('#login-button').click();
    cy.get('#login-message')
      .invoke('text', 'Credenciales inválidas')
      .should('contain', 'Credenciales inválidas');
  });

  it('Carrito - no debería permitir añadir producto sin stock', () => {
    cy.contains('Producto 2')
      .parents('.product-card')
      .within(() => {
        cy.get('button').click();
      });
    cy.get('#cart').contains('No hay stock disponible').should('be.visible');
  });

  it('Carrito - no debería permitir aplicar cupón vacío', () => {
    cy.get('#apply-discount').click();
    cy.get('#discount-message')
      .invoke('text', 'El cupón no puede estar vacío')
      .should('contain', 'El cupón no puede estar vacío');
  });

  it('Carrito - no debería aceptar cupón inválido', () => {
    cy.get('#discount-code').type('INVALIDO123');
    cy.get('#apply-discount').click();
    cy.get('#discount-message')
      .invoke('text', 'Cupón no válido')
      .should('contain', 'Cupón no válido');
  });

});
