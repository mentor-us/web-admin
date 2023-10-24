/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import "./commands";
import path from "path";

Cypress.Commands.add("restoreDataTest", () => {
  cy.task("restoreDB", Cypress.env("DB_DUMP_TEST"));
});

Cypress.Commands.add("dumpDataTest", () => {
  cy.task("dumpDB", Cypress.env("DB_DUMP_TEST"));
});

Cypress.Commands.add("listFileDownloaded", (filename) => {
  const downloadsFolder = Cypress.config("downloadsFolder");
  return cy.task("downloads", downloadsFolder);
});

const time = Date.now();
// const DB_DUMP_CURRENT = `current_data_${Cypress.env("PROJECT_VERSION")}_${time}.tar`; // Current test data filename - use for restore data live
const DB_DUMP_CURRENT = `current_data_${Cypress.env("PROJECT_VERSION")}.tar`; // Current test data filename - use for restore data live

before(() => {
  if (Cypress.testingType === "e2e") {
    if (Cypress.config("isInteractive")) {
      // cypress open
      cy.log("RUN IN UI MODE");
    } else {
      // cypress run
      cy.log("RUN IN CLI");
    }
    cy.log("DUMB LATEST DB DATA");
    // cy.task("dumpDB", DB_DUMP_CURRENT);
    // cy.task("restoreDB", "current_data_0.1.0_1697990732833.tar");
  }
  // cy.task("dumpDB", Cypress.env("DB_DUMP_TEST"));
  // cy.task("restoreDB", Cypress.env("DB_DUMP_TEST"));
});

after(() => {
  if (Cypress.testingType === "e2e") {
    if (Cypress.config("isInteractive")) {
      // cypress open
      cy.log("RUN IN UI MODE");
    } else {
      // cypress run
      cy.log("RUN IN CLI MODE");
    }
    cy.log("RESTORE LASTEST DB DATA");
    // cy.task("restoreDB", DB_DUMP_CURRENT);
  }
});
