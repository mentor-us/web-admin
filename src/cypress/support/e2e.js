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
import "cypress-if";

require("cy-verify-downloads").addCustomCommand();

const DB_DUMP_CURRENT = `current_data_${Cypress.env("PROJECT_VERSION")}.tar`; // Current test data filename - use for restore data live

Cypress.Commands.add("restoreDataTest", () => {
  cy.task("restoreDB", Cypress.env("DB_DUMP_TEST"));
});

Cypress.Commands.add("dumpDataTest", () => {
  cy.task("dumpDB", Cypress.env("DB_DUMP_TEST"));
});

Cypress.Commands.add("dumpCurrentData", () => {
  cy.log("DUMB LATEST DB DATA");
  cy.task("dumpDB", DB_DUMP_CURRENT, {
    timeout: 120000
  });
});

Cypress.Commands.add("restoreCurrentData", () => {
  cy.log("RESTORE LASTEST DB DATA");
  cy.task("restoreDB", DB_DUMP_CURRENT);
});

Cypress.Commands.add("listFileDownloaded", (filename) => {
  const downloadsFolder = Cypress.config("downloadsFolder");
  return cy.task("downloads", downloadsFolder);
});

const dbDumpExclude = [
  /LoginPage/,
  /SystemConfig/,
  /StatisticPage/,
  /AccountManagementPage/,
  /MyProfile/
];

const isSpecMustDumpDB = !dbDumpExclude.some((regex) => regex.test(Cypress.spec.fileName));

before(() => {
  if (Cypress.config("isInteractive")) {
    // cypress open
    cy.log("RUN IN UI MODE");
  } else {
    // cypress run
    cy.log("RUN IN CLI");
  }
  if (isSpecMustDumpDB) {
    cy.log(Cypress.spec.fileName);
    cy.dumpCurrentData();
  }

  // cy.task("dumpDB", "backup.tar");
  // cy.task("restoreDB", "backup.tar"); // Manually restore db if test error when design test
});

after(() => {
  if (Cypress.config("isInteractive")) {
    // cypress open
    cy.log("RUN IN UI MODE");
  } else {
    // cypress run
    cy.log("RUN IN CLI MODE");
  }
  if (isSpecMustDumpDB) {
    cy.log(Cypress.spec.fileName);
    cy.restoreCurrentData();
  }
});
