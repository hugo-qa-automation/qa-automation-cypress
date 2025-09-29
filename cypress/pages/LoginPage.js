class LoginPage {

  login(username, password) {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
  }

  verificarMensaje(mensaje) {
    cy.get('#login-message').should('contain.text', mensaje);
  }
}

export default LoginPage;
