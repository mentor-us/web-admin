// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "loginWithPassword",
  (email = "dqvinh20@clc.fitus.edu.vn", password = "123") => {
    cy.session(
      email,
      () => {
        cy.visit("/");
        cy.clearLocalStorage();
        cy.request({
          method: "POST",
          url: `${Cypress.env("BACKEND_URL")}api/auth/login`,
          body: {
            email,
            password
          }
        }).then((response) => {
          window.localStorage.setItem("access_token", response.body.accessToken);
        });
      },
      {
        validate: () => {
          expect(window.localStorage.getItem("access_token")).to.be.a("string");
        }
      }
    );
  }
);

Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem("access_token");
});
