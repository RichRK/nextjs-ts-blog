
describe("Animal sponsorship", () => {

  beforeEach(() => { cy.visit_localhost() });

  it("Add an animal", () => {
    cy.contains("Add").click();
    cy.get(".animalContainer p")
      .should('have.length', 1);
  });

  it('Adds several animals', () => {
    const indexes = [1, 5, 6, 9];

    cy.contains("Add").click();
    cy.select_multiple_animals(indexes);

    cy.get(".animalContainer p")
      .should('have.length', indexes.length + 1);
  });

  it("Tries to add the same animal twice", () => {
    cy.contains("Add").click();
    cy.contains("Add").click();

    cy.get(".animalContainer p").should("have.length", 1);

    cy.contains("They're already in your sponsor list!");
  });

  it("Clears all added animals", () => {
    const indexes = [2, 8];

    cy.select_multiple_animals(indexes);
    cy.contains("Clear all").click();

    cy.get(".animalContainer p").should("have.length", 0);
  });
});
