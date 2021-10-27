describe("General blog integrity", () => {

  beforeEach(() => { cy.visit_localhost() });

  // it("Verify hover state", () => {
  //   cy.contains("Read Documentation")
  //     .should('have.css', 'background-color', 'rgb(0, 0, 0)')
  //     .realHover()
  //     .wait(300)  // allows transition animation to finish
  //     .should('have.css', 'background-color', 'rgb(255, 255, 255)');
  // });

  it("Verify links", () => {
    cy.check_link_path('Dynamic routing', 'dynamic-routing')
      .wait(1000)
      .check_link_path('Learn how', 'hello-world')
      .wait(1000)
      .check_link_path('Preview mode', 'preview');
  });
});
