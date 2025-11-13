import CarritoPage from '../pages/CarritoPage';

const carritoPage = new CarritoPage();

// Mock de productos para tests
const productos = [
  { id: 1, name: 'Producto 1 Modificado', price: 10, stock: 5 },
  { id: 2, name: 'Producto 2', price: 15, stock: 0 }, // sin stock
  { id: 3, name: 'Producto 3', price: 20, stock: 3 }
];

describe('Carrito de compras', () => {
  beforeEach(() => {
    // Interceptamos la llamada a la API y devolvemos nuestros productos mock
    cy.intercept('GET', 'http://localhost:4000/products', productos).as('getProducts');

    // Visitamos la página y esperamos la respuesta
    cy.visit('http://127.0.0.1:5501/app/index.html');
    cy.wait('@getProducts');
  });

  it('TC001 - Añadir producto al carrito con stock', () => {
    carritoPage.agregarProductoConStock();
    carritoPage.verificarProductoEnCarrito(productos[0].name);
  });

  it('TC002 - Intentar añadir producto sin stock', () => {
    carritoPage.agregarProductoSinStock();
    carritoPage.verificarMensaje('Producto no disponible');
    carritoPage.verificarProductoNoEnCarrito(productos[1].name);
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
    carritoPage.agregarProducto(productos[0].name);
    carritoPage.verificarProductoEnCarrito(productos[0].name);

    carritoPage.eliminarProducto(productos[0].name);
    carritoPage.verificarProductoNoEnCarrito(productos[0].name);
  });

  it('TC008 - Añadir 2 productos y verificar total', () => {
    const prod1 = productos[0];
    const prod3 = productos[2];
    const totalEsperado = prod1.price + prod3.price;

    carritoPage.agregarProducto(prod1.name);
    carritoPage.agregarProducto(prod3.name);

    carritoPage.verificarProductoEnCarrito(prod1.name);
    carritoPage.verificarProductoEnCarrito(prod3.name);

    carritoPage.verificarTotal(totalEsperado);
  });

  it('TC009 - Añadir 2 productos, eliminar 1 y verificar total', () => {
    const prod1 = productos[0];
    const prod3 = productos[2];

    carritoPage.agregarProducto(prod1.name);
    carritoPage.agregarProducto(prod3.name);

    carritoPage.verificarProductoEnCarrito(prod1.name);
    carritoPage.verificarProductoEnCarrito(prod3.name);

    carritoPage.eliminarProducto(prod1.name);

    carritoPage.verificarProductoNoEnCarrito(prod1.name);
    carritoPage.verificarProductoEnCarrito(prod3.name);

    carritoPage.verificarTotal(prod3.price);
  });

  it('TC010 - Aplicar cupón válido y verificar total', () => {
    const prod1 = productos[0];
    const prod3 = productos[2];
    const total = prod1.price + prod3.price;
    const totalConDescuento = total * 0.9;

    carritoPage.agregarProducto(prod1.name);
    carritoPage.agregarProducto(prod3.name);

    carritoPage.verificarProductoEnCarrito(prod1.name);
    carritoPage.verificarProductoEnCarrito(prod3.name);

    carritoPage.aplicarCodigoDescuento('DESCUENTO10');
    carritoPage.verificarMensaje('Código aplicado correctamente');

    carritoPage.verificarTotal(totalConDescuento);
  });

  it('TC011 - Intentar aplicar un cupón vacío y verificar mensaje de error', () => {
    const prod1 = productos[0];

    carritoPage.agregarProducto(prod1.name);
    carritoPage.verificarProductoEnCarrito(prod1.name);

    carritoPage.aplicarCodigoDescuento('');
    carritoPage.verificarMensaje('Código no válido');

    carritoPage.verificarTotal(prod1.price);
  });
});


