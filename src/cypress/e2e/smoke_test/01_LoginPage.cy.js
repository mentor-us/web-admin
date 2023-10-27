describe("Login Page", () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    Cypress.session.clearAllSavedSessions();
  });

  it("MU-43 Login to Web Admin with Google Account", { defaultCommandTimeout: 20000 }, () => {
    cy.loginWithGoogle(Cypress.env("gg_username"), Cypress.env("gg_password"));
  });

  it("MU-46 Login to Web Admin with Microsoft Account", () => {
    cy.loginWithMicrosoft(Cypress.env("aad_username"), Cypress.env("aad_password"));
  });
});
