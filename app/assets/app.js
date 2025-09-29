document.addEventListener('DOMContentLoaded', () => {
  const API = 'http://localhost:4000/products';
  const productsContainer = document.getElementById('products');
  const cartItemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  const discountCodeInput = document.getElementById('discount-code');
  const applyDiscountBtn = document.getElementById('apply-discount');
  const discountMessageEl = document.getElementById('discount-message');

  let products = [];
  let cart = [];
  let total = 0;
  let discountApplied = false;

  function formatMoney(num) {
    const rounded = Math.round(num * 100) / 100;
    if (Number.isInteger(rounded)) return `$${rounded}`;
    return `$${rounded.toFixed(2)}`;
  }

  function updateTotalDisplay() {
    totalEl.textContent = `Total: ${formatMoney(total)}`;
  }

  function renderCart() {
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.classList.add('remove');
      removeBtn.addEventListener('click', () => {
        const index = cart.findIndex(c => c.id === item.id);
        if (index !== -1) {
          cart.splice(index, 1);
          total -= item.price;
          if (discountApplied) total = Math.round((total * 0.9) * 100) / 100;
          updateTotalDisplay();
          renderCart();
        }
      });

      li.appendChild(removeBtn);
      cartItemsEl.appendChild(li);
    });
    updateTotalDisplay();
  }

  function addToCart(product) {
    cart.push(product);
    total += product.price;
    if (discountApplied) total = Math.round((total * 0.9) * 100) / 100;
    renderCart();
  }

  function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card' + (p.stock === 0 ? ' out-of-stock' : '');
      const title = document.createElement('h2');
      title.innerText = p.name;
      const stock = document.createElement('p');
      stock.innerText = `Stock: ${p.stock}`;
      const btn = document.createElement('button');
      btn.innerText = 'Añadir al carrito';
      btn.addEventListener('click', () => {
        if (p.stock > 0) addToCart(p);
        else discountMessageEl.innerText = 'Producto no disponible';
      });

      card.appendChild(title);
      card.appendChild(stock);
      card.appendChild(btn);
      productsContainer.appendChild(card);
    });
  }

  // Fetch API
  fetch(API)
    .then(res => res.ok ? res.json() : Promise.reject('Error API'))
    .then(data => {
      products = data;
      renderProducts();
    })
    .catch(err => {
      console.warn('API no disponible, usando productos locales', err);
      products = [
        { id: 1, name: 'Producto 1', stock: 10, price: 10 },
        { id: 2, name: 'Producto 2', stock: 0, price: 10 },
        { id: 3, name: 'Producto 3', stock: 5, price: 10 }
      ];
      renderProducts();
    });

  // Descuento
  applyDiscountBtn.addEventListener('click', () => {
    const code = discountCodeInput.value.trim();
    if (code === 'DESCUENTO10') {
      discountMessageEl.innerText = 'Código aplicado correctamente';
      discountApplied = true;
      total = Math.round((total * 0.9) * 100) / 100;
      updateTotalDisplay();
    } else {
      discountMessageEl.innerText = 'Código no válido';
      discountApplied = false;
    }
  });

  // Login
  document.getElementById('login-button').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('login-message');

    if (user === 'Pepe' && pass === '1234') msg.innerText = 'Inicio sesión exitoso';
    else msg.innerText = 'Usuario o contraseña incorrecto';
  });

  // Newsletter
  document.getElementById('subscribe-button').addEventListener('click', () => {
    const email = document.getElementById('email-input').value;
    const msg = document.getElementById('subscription-message');

    msg.innerText = email.includes('@') ? '¡Te has suscrito con éxito!' : 'Introduce un correo válido';
  });
});
