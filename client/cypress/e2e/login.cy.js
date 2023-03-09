describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/login");
  });
  it("should show error message if both fields are empty", () => {
    cy.get("[data-testid=email] input").clear();
    cy.get("[data-testid=password] input").clear();
    cy.get("[data-testid=password] input").blur();
    cy.wait(4000);
  });
  it("Email Not Exits", () => {
    cy.get("[data-testid=email]").type("testexample@gmail.com");
    cy.get("[data-testid=password]").type("TestUser@123");
    cy.get("[data-testid=submit]").should("not.be.disabled").click();
    cy.wait(4000);
  });
  it("Password not matched", () => {
    cy.get("[data-testid=email]").type("test@gmail.com");
    cy.get("[data-testid=password]").type("TestWrong@123");
    cy.get("[data-testid=submit]").should("not.be.disabled").click();
    cy.wait(4000);
  });
  it("Logs in successfully", () => {
    cy.get("[data-testid=email]").type("test@gmail.com");
    cy.get("[data-testid=password]").type("TestUser@123");
    cy.get("[data-testid=submit]").should("not.be.disabled").click();
    cy.url().should("include", "/user/profile");
  });
});
