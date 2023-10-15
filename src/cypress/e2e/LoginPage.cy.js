describe("Login Page", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.visit("/sign-in");
  });

  it("show login page", () => {
    cy.contains("Đăng nhập").should("be.visible");
    cy.get(":nth-child(2) > .MuiButtonBase-root")
      .should("be.visible")
      .find("span")
      .contains("Đăng nhập bằng Google")
      .should("be.visible");
    cy.get(":nth-child(4) > .MuiButtonBase-root")
      .should("be.visible")
      .find("span")
      .contains("Đăng nhập bằng Microsoft")
      .should("be.visible");
  });
});
