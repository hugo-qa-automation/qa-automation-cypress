/// <reference types="cypress" />

describe('API Tests - JSON Server (Completo)', () => {
  const baseUrl = 'http://localhost:4000';
  let createdItemId; // Para guardar el ID de un producto creado

  // 1️⃣ GET /products
  it('GET /products debería devolver lista de productos', () => {
    cy.request(`${baseUrl}/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  // 2️⃣ GET /cart
  it('GET /cart debería devolver carrito (array)', () => {
    cy.request(`${baseUrl}/cart`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  // 3️⃣ POST /cart
  it('POST /cart debería permitir añadir un producto', () => {
    const newItem = { productId: 1, quantity: 2 };
    cy.request('POST', `${baseUrl}/cart`, newItem).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.productId).to.eq(newItem.productId);

      // Guardamos el id para DELETE y PUT
      createdItemId = response.body.id;
    });
  });

  // 4️⃣ DELETE /cart/:id
  it('DELETE /cart/:id debería eliminar un producto del carrito', () => {
    // Nos aseguramos de que exista un item primero
    if (!createdItemId) {
      cy.request('POST', `${baseUrl}/cart`, { productId: 2, quantity: 1 }).then((res) => {
        createdItemId = res.body.id;
      });
    }

    cy.request('DELETE', `${baseUrl}/cart/${createdItemId}`).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Comprobamos que ya no existe
    cy.request(`${baseUrl}/cart`).then((res) => {
      const ids = res.body.map(item => item.id);
      expect(ids).to.not.include(createdItemId);
    });
  });

  // 5️⃣ PUT /cart/:id
  it('PUT /cart/:id debería actualizar un producto del carrito', () => {
    // Creamos un item nuevo para actualizar
    cy.request('POST', `${baseUrl}/cart`, { productId: 3, quantity: 1 }).then((res) => {
      const itemId = res.body.id;

      // Actualizamos la cantidad
      cy.request('PUT', `${baseUrl}/cart/${itemId}`, { productId: 3, quantity: 5 }).then((updateRes) => {
        expect(updateRes.status).to.eq(200);
        expect(updateRes.body.quantity).to.eq(5);
      });

      // Verificamos con GET
      cy.request(`${baseUrl}/cart/${itemId}`).then((getRes) => {
        expect(getRes.body.quantity).to.eq(5);
      });
    });
  });
});
