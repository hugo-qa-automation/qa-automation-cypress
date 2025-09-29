import CarritoPage from '../pages/CarritoPage';

const carritoPage = new CarritoPage();
let productos = [];

describe('Carrito de compras', () => {
  before(() => {
    // Obtenemos productos reales de la API
    cy.request('http://localhost:4000/products').then((resp) => {
      productos = resp.body;
      cy.log(JSON.stringify(productos)); // 👀 Para debug en Cypress runner
    });
  });

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/app/index.html'); // Ajusta si cambia el puerto
  });

  it('TC001 - Añadir producto al carrito con stock', () => {
    carritoPage.agregarProductoConStock();
    carritoPage.verificarProductoEnCarrito('Producto 1');
  });

  it('TC002 - Intentar añadir producto sin stock', () => {
    carritoPage.agregarProductoSinStock();
    carritoPage.verificarMensaje('Producto no disponible');
    carritoPage.verificarProductoNoEnCarrito('Producto 2');
  });

  it('TC003 - Aplicar código de descuento válido', () => {
    carritoPage.aplicarCodigoDescuento('DESCUENTO10');
    carritoPage.verificarMensaje('Código aplicado correctamente');
  });

  it('TC004 - Intentar aplicar código de descuento inválido', () => {
    carritoPage.aplicarCodigoDescuento('MALO123');
    carritoPage.verificarMensaje('Código no válido');
  });

  it('TC005 - Eliminar producto del carrito', () => {
    carritoPage.agregarProductoConStock();
    carritoPage.verificarProductoEnCarrito('Producto 1');

    carritoPage.eliminarProducto('Producto 1');
    carritoPage.verificarProductoNoEnCarrito('Producto 1');
  });

  it('TC008 - Añadir 2 productos y verificar total', () => {
    const prod1 = productos.find(p => p.id === 1);
    const prod3 = productos.find(p => p.id === 3);
    const totalEsperado = prod1.price + prod3.price;

    carritoPage.agregarProducto('Producto 1');
    carritoPage.agregarProducto('Producto 3');

    carritoPage.verificarProductoEnCarrito('Producto 1');
    carritoPage.verificarProductoEnCarrito('Producto 3');

    carritoPage.verificarTotal(`$${totalEsperado}`);
  });

  it('TC009 - Añadir 2 productos, eliminar 1 y verificar total', () => {
    const prod3 = productos.find(p => p.id === 3);

    carritoPage.agregarProducto('Producto 1');
    carritoPage.agregarProducto('Producto 3');

    carritoPage.verificarProductoEnCarrito('Producto 1');
    carritoPage.verificarProductoEnCarrito('Producto 3');

    carritoPage.eliminarProducto('Producto 1');

    carritoPage.verificarProductoNoEnCarrito('Producto 1');
    carritoPage.verificarProductoEnCarrito('Producto 3');

    carritoPage.verificarTotal(`$${prod3.price}`);
  });

  it('TC010 - Aplicar cupón válido y verificar total', () => {
    const prod1 = productos.find(p => p.id === 1);
    const prod3 = productos.find(p => p.id === 3);
    const total = prod1.price + prod3.price;
    const totalConDescuento = (total * 0.9).toFixed(2);

    carritoPage.agregarProducto('Producto 1');
    carritoPage.agregarProducto('Producto 3');

    carritoPage.verificarProductoEnCarrito('Producto 1');
    carritoPage.verificarProductoEnCarrito('Producto 3');

    carritoPage.aplicarCodigoDescuento('DESCUENTO10');
    carritoPage.verificarMensaje('Código aplicado correctamente');

    carritoPage.verificarTotal(`$${totalConDescuento}`);
  });

  it('TC011 - Intentar aplicar un cupón vacío y verificar mensaje de error', () => {
    const prod1 = productos.find(p => p.id === 1);

    carritoPage.agregarProducto('Producto 1');
    carritoPage.verificarProductoEnCarrito('Producto 1');

    carritoPage.aplicarCodigoDescuento('');
    carritoPage.verificarMensaje('Código no válido');

    carritoPage.verificarTotal(`$${prod1.price}`);
  });
});



