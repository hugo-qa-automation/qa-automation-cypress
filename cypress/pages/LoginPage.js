class LoginPage {

  login(username, password) {
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('#login-button').click();
  }

  verificarMensaje(mensaje) {
    cy.get('#login-message', { timeout: 5000 }).should('contain.text', mensaje);
  }
}

export default LoginPage;

