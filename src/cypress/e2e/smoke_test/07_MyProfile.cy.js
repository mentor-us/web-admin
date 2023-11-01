describe("My Profile", () => {
  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept("api/users/*/detail").as("getUserDetail");
    cy.intercept("api/groups*").as("getGroups");
    cy.visit("/groups");
    cy.wait("@getUserDetail").its("response.statusCode").should("eq", 200);
  });

  const viewMyProfile = () => {
    cy.wait("@getGroups").its("response.statusCode").should("eq", 200);
    cy.get("@getUserDetail")
      .its("response.body.data.imageUrl")
      .then((imageUrl) => {
        cy.get(`img[alt="profile-image"][src$="${imageUrl}"]`)
          .parents("button")
          .should("be.visible")
          .should("be.enabled")
          .click();
      });
    cy.get("#account-menu > .MuiPaper-root").as("menu").should("be.visible");
    cy.get('.MuiList-root > [tabindex="0"]')
      .as("viewMyProfile")
      .should("be.visible")
      .and("have.text", "account_circleHồ sơ cá nhân");
    cy.get("#account-menu > .MuiPaper-root > .MuiList-root > :nth-child(4)")
      .should("be.visible")
      .and("have.text", "logoutĐăng xuất");
    cy.get("@getUserDetail").its("response.statusCode").should("eq", 200);
    cy.get("@getUserDetail")
      .its("response.body.data")
      .then((data) => {
        cy.get("@menu").contains("h5", data.name).should("be.visible");
        cy.get("@viewMyProfile").click();
        cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
          .should("be.visible")
          .and("have.text", "Chi tiết tài khoản");

        cy.get(`img[src$='${data.imageUrl}']`).should("be.visible");
        cy.contains(data.name).should("be.visible");
        cy.contains(data.email).should("be.visible");
      });
  };

  it("MU-130 View my profile", () => {
    viewMyProfile();
  });

  it("MU-131 Update my profile", () => {
    viewMyProfile();
    cy.get(":nth-child(2) > .MuiButtonBase-root > .material-icons-round").as("editBtn").click();
    cy.get("#\\:rl\\:").as("emailInput").clear();
    cy.get("@emailInput").type("duongquangvinh2210@gmail.com");
    cy.get("#\\:rm\\:").as("phoneNumber").clear();
    cy.get("@phoneNumber").type("0972360214");
    cy.get(".MuiTypography-h5").should("be.visible").should("have.text", "Chỉnh sửa Tài khoản");
    cy.get(".css-1s0ycc1 > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Cập nhật thông tin cho email test.acc.mentorus@gmail.com");
    cy.get("@emailInput").should("have.value", "duongquangvinh2210@gmail.com");
    cy.get("@phoneNumber").should("have.value", "0972360214");
    cy.contains("button", "Xác nhận").click();
    cy.contains("0972360214").should("be.visible");
    cy.contains("duongquangvinh2210@gmail.com").should("be.visible");
    cy.get("@editBtn").click();
    cy.get("#\\:rq\\:").clear("duongquangvinh2210@gmail.com");
    cy.get("#\\:rr\\:").clear("0972360214");
    cy.contains("button", "Xác nhận").click();
  });

  it("MU-47 Logout account", () => {
    cy.wait("@getGroups").its("response.statusCode").should("eq", 200);
    cy.get("@getUserDetail")
      .its("response.body.data.imageUrl")
      .then((imageUrl) => {
        cy.get(`img[alt="profile-image"][src$="${imageUrl}"]`)
          .parents("button")
          .should("be.visible")
          .should("be.enabled")
          .click();
      });
    cy.get("#account-menu > .MuiPaper-root > .MuiList-root > :nth-child(4)").click();
    cy.contains("Đăng nhập").should("be.visible");
    cy.url().should("include", "/sign-in");
    cy.visit("/groups");
    cy.url().should("include", "/sign-in");
    cy.contains("Quản lý nhóm").should("not.exist");
  });
});
