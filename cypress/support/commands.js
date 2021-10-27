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

Cypress.Commands.add("visit_localhost", () => {
  cy.visit("http://localhost:3000/");
});

Cypress.Commands.add("get_muilist_list_item", (index) => {
  return cy.get(".MuiList-root").find("li").eq(index);
});

Cypress.Commands.add("check_link_path", (link, path) => {
  cy.contains(link, { matchCase: false }).click();
  cy.location("pathname").should("include", path);
  cy.go("back");
});

Cypress.Commands.add("select_multiple_animals", (indexes) => {
  cy.wrap(indexes).each((index) => {
    cy.get(".MuiOutlinedInput-root").click();
    cy.get_muilist_list_item(index).click();
    cy.contains("Add").click();
  });
});
