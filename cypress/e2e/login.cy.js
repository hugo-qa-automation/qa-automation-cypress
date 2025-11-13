import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

describe('Login con Page Object', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/app/index.html');
  });

  it('TC006 - Inicio sesión válido', () => {
    cy.fixture('usuarios').then((data) => {
      loginPage.login(data.valido.username, data.valido.password);
      loginPage.verificarMensaje('Inicio sesión exitoso'); 
    });
  });

  it('TC007 - Inicio sesión inválido', () => {
    cy.fixture('usuarios').then((data) => {
      loginPage.login(data.invalido.username, data.invalido.password);
      loginPage.verificarMensaje('Credenciales inválidas'); // exacto al app.js
    });
  });

});





