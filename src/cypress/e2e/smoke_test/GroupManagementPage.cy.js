describe("Group Management Page", () => {
  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("BACKEND_URL")}api/groups?type=admin&page=0&pageSize=10`
    }).as("fetchGroups");
    cy.visit("/groups");
  });

  it("MU-60 show all groups list", () => {
    cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
      .should("be.visible")
      .should("have.text", "Quản lý nhóm");

    cy.get("table").find("tr").should("have.length.at.least", 1);
    cy.wait("@fetchGroups")
      .its("response.body.data.totalItems")
      .then((totalItems) => {
        cy.get("span")
          .contains(`Số lượng kết quả:`)
          .should("be.visible")
          .find("span")
          .should("have.text", totalItems);
      });
  });
});
