/// <reference types="cypress" />

describe('UI + API Tests - Mini Tienda', () => {
  const baseUrl = 'http://127.0.0.1:5501/app/index.html'; // tu live-server
  const apiUrlProducts = 'http://localhost:4000/products';
  const apiUrlCart = 'http://localhost:4000/cart';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // --- UI TESTS ---
  it('Carga la tienda y muestra productos', () => {
    cy.get('.product-card').should('have.length.greaterThan', 0);
  });

  it('Permite añadir un producto al carrito', () => {
    cy.get('.product-card button').first().click();
    cy.get('#cart-items li').should('have.length', 1);
  });

  it('Permite aplicar un código de descuento válido', () => {
    cy.get('#discount-code').type('DESCUENTO10');
    cy.get('#apply-discount').click();
    cy.get('#discount-message').should('contain', 'Código aplicado correctamente');
  });

  it('Login con credenciales correctas', () => {
    cy.get('#username').type('Pepe');
    cy.get('#password').type('1234');
    cy.get('#login-button').click();
    cy.get('#login-message').should('contain', 'Inicio sesión exitoso');
  });

  it('Permite suscribirse al newsletter con un email válido', () => {
    cy.get('#email-input').type('test@mail.com');
    cy.get('#subscribe-button').click();
    cy.get('#subscription-message').should('contain', '¡Te has suscrito con éxito!');
  });

  // --- API TESTS ---
  it('GET /products devuelve productos', () => {
    cy.request(apiUrlProducts).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  it('POST /cart añade un producto', () => {
    const newItem = { productId: 1, quantity: 2 };
    cy.request('POST', apiUrlCart, newItem).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('id');
      expect(res.body.productId).to.eq(newItem.productId);
    });
  });

  it('DELETE /cart elimina un producto', () => {
    cy.request('POST', apiUrlCart, { productId: 1, quantity: 1 }).then((res) => {
      const id = res.body.id;
      cy.request('DELETE', `${apiUrlCart}/${id}`).its('status').should('eq', 200);
    });
  });
});
