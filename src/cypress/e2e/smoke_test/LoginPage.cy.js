describe("Login Page", () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  it("MU-43 Login to Web Admin with Google Account", () => {
    cy.loginWithGoogle(Cypress.env("gg_username"), Cypress.env("gg_password"));
  });

  it("MU-46 Login to Web Admin with Microsoft Account", () => {
    cy.loginWithMicrosoft(Cypress.env("aad_username"), Cypress.env("aad_password"));
  });
});
