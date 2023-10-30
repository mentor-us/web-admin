describe("System Config", () => {
  const openSystemConfig = () => {
    cy.get("span")
      .contains("settings")
      .as("settingsBtn")
      .should("be.visible")
      .should("have.text", "settings");
    cy.get("@settingsBtn").click();
    cy.contains("Cập nhật").as("updateBtn");
  };

  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept("api/system-config/all").as("getSystemConfig");
    cy.visit("/groups");
    openSystemConfig();
  });

  it("MU-75 View system config", () => {
    cy.wait("@getSystemConfig")
      .its("response.body.data")
      .invoke("filter", (item) => item.key === "valid_max_year")
      .should("have.length", 1)
      .invoke("at", 0)
      .its("value")
      .then(cy.wrap)
      .as("maxYear");

    cy.contains("Cấu hình MentorUS").should("be.visible");
    cy.get(".MuiPaper-elevation16").contains("close").as("closeModal").should("be.visible");
    cy.contains("Cập nhật")
      .should("be.enabled")
      .should("be.visible")
      .should("have.text", "editCập nhật");

    cy.contains("Khoảng thời gian tối đa").should("be.visible");
    cy.get("@maxYear")
      .should("be.a", "number")
      .then((maxYear) => {
        cy.contains(`${maxYear} năm`).should("be.visible");
      });
  });

  it("MU-76 Update max learning year", () => {
    cy.get("@updateBtn").click();
    cy.get(".group-modal__container > .MuiTypography-h5")
      .should("be.visible")
      .should("have.text", "Cập nhật thông tin cấu hình");
    cy.get(".css-1qoos23 > :nth-child(3) > .MuiBox-root > .MuiTypography-body2")
      .should("be.visible")
      .should("have.text", "Khoảng thời gian tối đa (*)");
    cy.get(":nth-child(3) > .MuiBox-root > .MuiTypography-caption")
      .should("have.text", "Đơn vị: năm")
      .should("be.visible");

    cy.contains("Hủy")
      .as("cancelBtn")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "closeHủy");
    cy.contains("Xác nhận")
      .as("confirmBtn")
      .should("be.visible")
      .should("have.text", "checkXác nhận");

    cy.get("#\\:rl\\:").clear("3");
    cy.get("#\\:rl\\:").type("3");
    cy.get("@confirmBtn").should("be.enabled").click();
    cy.contains("3 năm").should("be.visible");
    cy.get("@updateBtn").click();
    cy.get("#\\:rr\\:").should("have.value", "3");
    cy.get("#\\:rr\\:").clear("7");
    cy.get("#\\:rr\\:").type("7");
    cy.get("@confirmBtn").click();
    cy.contains("7 năm").should("be.visible");
    cy.get(".MuiPaper-elevation16").should("be.visible");
    cy.get(".css-1dyncq9 > .material-icons-round").click();
    cy.get(".MuiPaper-elevation16").should("not.exist");
  });
});
