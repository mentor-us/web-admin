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
import "cypress-file-upload";

Cypress.Commands.add(
  "loginWithPassword",
  (username = Cypress.env("basic_username"), password = Cypress.env("basic_password")) => {
    cy.session(
      `basic-${username}`,
      () => {
        const log = Cypress.log({
          displayName: "Basic Login",
          message: [`🔐 Authenticating | ${username}`],
          autoEnd: false
        });
        log.snapshot("before");

        cy.visit("/");
        cy.clearLocalStorage();
        cy.request({
          method: "POST",
          url: `${Cypress.env("BACKEND_URL")}api/auth/login`,
          body: {
            email: username,
            password
          }
        }).then((response) => {
          window.localStorage.setItem("access_token", response.body.accessToken);
        });

        log.snapshot("after");
        log.end();
      },
      {
        validate: () => {
          cy.visit("/");
          cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
            .should("be.visible")
            .should("have.text", "Quản lý nhóm");
          expect(window.localStorage.getItem("access_token")).to.be.a("string");
        },
        cacheAcrossSpecs: true
      }
    );
  }
);

function loginViaAAD(username, password) {
  cy.visit("/");
  cy.get("div:nth-of-type(4) > a").click();

  // Login to your AAD tenant.
  cy.origin(
    "login.microsoftonline.com",
    {
      args: {
        username,
        password
      }
    },
    ({ username, password }) => {
      cy.get('input[type="email"]').type(username, {
        log: false
      });
      cy.get('input[type="submit"]').click();
      cy.get('input[type="password"]').type(password, {
        log: false
      });
      cy.get('input[type="submit"]').click();
      cy.get("#idBtn_Back").click();
    }
  );

  // Ensure Microsoft has redirected us back to the sample app with our logged in user.
  cy.url().should("equal", "http://localhost:3000/groups");
  cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
    .should("be.visible")
    .should("have.text", "Quản lý nhóm");
}

Cypress.Commands.add(
  "loginWithMicrosoft",
  (username = Cypress.env("aad_username"), password = Cypress.env("aad_password")) => {
    cy.session(
      `aad-${username}`,
      () => {
        const log = Cypress.log({
          displayName: "Azure Active Directory Login",
          message: [`🔐 Authenticating | ${username}`],
          autoEnd: false
        });
        log.snapshot("before");

        loginViaAAD(username, password);

        log.snapshot("after");
        log.end();
      },
      {
        validate: () => {
          expect(window.localStorage.getItem("access_token")).to.be.a("string");
          cy.url().should("equal", "http://localhost:3000/groups");
          cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
            .should("be.visible")
            .should("have.text", "Quản lý nhóm");
        },
        cacheAcrossSpecs: true
      }
    );
  }
);

function logIntoGoogle(username, password) {
  Cypress.on(
    "uncaught:exception",
    (err) =>
      !err.message.includes("ResizeObserver loop") &&
      !err.message.includes("Error in protected function")
  );
  cy.visit("/");
  cy.get("div:nth-of-type(2) > a").click();

  cy.origin(
    "https://accounts.google.com",
    {
      args: {
        username,
        password
      }
    },
    ({ username, password }) => {
      Cypress.on(
        "uncaught:exception",
        (err) =>
          !err.message.includes("ResizeObserver loop") &&
          !err.message.includes("Error in protected function")
      );

      cy.get('input[type="email"]').type(username, {
        log: false
      });
      // NOTE: The element exists on the original form but is hidden and gets rerendered, which leads to intermittent detached DOM issues
      cy.get("#identifierNext").should("be.visible");
      cy.get("#identifierNext").click();
      cy.get('input[type="password"]').should("be.visible");
      cy.get('input[type="password"]').first().type(password, {
        log: false
      });
      cy.get("#passwordNext").click();
    }
  );
  cy.url().should("equal", "http://localhost:3000/groups");
  cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
    .should("be.visible")
    .should("have.text", "Quản lý nhóm");
}

Cypress.Commands.add(
  "loginWithGoogle",
  (username = Cypress.env("gg_username"), password = Cypress.env("gg_password")) => {
    cy.session(
      `gg-${username}`,
      () => {
        const log = Cypress.log({
          displayName: "Google Login",
          message: [`🔐 Authenticating | ${username}`],
          autoEnd: false
        });
        log.snapshot("before");

        logIntoGoogle(username, password);

        log.snapshot("after");
        log.end();
      },
      {
        validate: () => {
          expect(window.localStorage.getItem("access_token")).to.be.a("string");
          cy.url().should("equal", "http://localhost:3000/groups");
          cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
            .should("be.visible")
            .should("have.text", "Quản lý nhóm");
        },
        cacheAcrossSpecs: true
      }
    );
  }
);

Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem("access_token");
});
