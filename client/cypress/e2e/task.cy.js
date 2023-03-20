describe("Task", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/login");
  });
  it("should show error message if both fields are empty", () => {
    cy.get("[data-testid=email] input").clear();
    cy.get("[data-testid=password] input").clear();
    cy.get("[data-testid=password] input").blur();
    cy.wait(4000);
  }); 
});
