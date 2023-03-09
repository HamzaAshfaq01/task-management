describe("Registration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/registration");
  });
  it("should show error message if fields are empty", () => {
    cy.get("[data-testid=name] input").clear();
    cy.get("[data-testid=email] input").clear();
    cy.get("[data-testid=password] input").clear();
    cy.get("[data-testid=confirm_password] input").clear();
    cy.get("[data-testid=confirm_password] input").blur();
    cy.wait(4000);
  });
  it("Valid Name Length", () => {
    cy.get("[data-testid=name]").type("te");
    cy.get("[data-testid=name] input").blur();
    cy.wait(4000);
  });
  it("Valid Name Must contain the characters A-Z a-z must not have spaces in front and behind.", () => {
    cy.get("[data-testid=name]").type(" te ");
    cy.get("[data-testid=name] input").blur();
    cy.wait(4000);
  });
  it("The email provided should be a valid email address", () => {
    cy.get("[data-testid=name]").type("test2");
    cy.get("[data-testid=email]").type("testgmail");
    cy.get("[data-testid=email] input").blur();
    cy.wait(4000);
  });
  it("Password must contain 8 characters, one uppercase, one lowercase, one number", () => {
    cy.get("[data-testid=name]").type("test2");
    cy.get("[data-testid=email]").type("test2@gmail.com");
    cy.get("[data-testid=password]").type("TestUser");
    cy.get("[data-testid=password] input").blur();
    cy.wait(4000);
  });
  it("Both password fields need to be the same", () => {
    cy.get("[data-testid=name]").type("test2");
    cy.get("[data-testid=email]").type("test2@gmail.com");
    cy.get("[data-testid=password]").type("TestUser@123");
    cy.get("[data-testid=confirm_password]").type("TestUser@13");
    cy.get("[data-testid=confirm_password] input").blur();
    cy.wait(4000);
  });
  it("Both password fields need to be the same", () => {
    cy.get("[data-testid=name]").type("test2");
    cy.get("[data-testid=email]").type("test2@gmail.com");
    cy.get("[data-testid=password]").type("TestUser@123");
    cy.get("[data-testid=confirm_password]").type("TestUser@123");
    cy.get("[data-testid=confirm_password] input").blur();
    cy.get("[data-testid=submit]").should("not.be.disabled").click();
    cy.wait(4000);
  });
});
