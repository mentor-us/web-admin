describe("Group Management Page", () => {
  before(() => {
    cy.dumpCurrentData();
    cy.restoreDataTest();
  });

  after(() => {
    cy.restoreCurrentData();
  });

  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("BACKEND_URL")}api/groups?type=admin&page=*&pageSize=*`
    }).as("fetchGroups");
    cy.visit("/groups");
  });

  it("MU-60 View all groups in table", () => {
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

  it("MU-61 Search groups", () => {
    cy.intercept("GET", `${Cypress.env("BACKEND_URL")}api/groups/find*`).as("findGroups");
    cy.get("div.MuiButtonBase-root").click();
    cy.get("#\\:r1\\:").click();
    cy.get("#\\:r1\\:").type("Test");
    cy.get("#\\:r2\\:").click();
    cy.get("#\\:r2\\:-option-0").click();
    cy.get("#\\:r6\\:").click();
    cy.get("#\\:r6\\:-option-1").click();
    cy.get("div.MuiCollapse-root > div > div > div > div > div.MuiBox-root p").click();
    cy.wait("@findGroups").its("response.body.data.totalItems").as("searchTotalItems");
    cy.get(".MuiTypography-caption > span").should("be.visible");
    cy.get("@searchTotalItems").then((value) => {
      cy.get(".MuiTypography-caption > span").should("have.text", value);
      cy.get(":nth-child(1) > :nth-child(2) > .MuiBox-root > a > .MuiTypography-root")
        .contains(/Test/i)
        .should("be.visible");
      cy.get(
        ".MuiTableBody-root > :nth-child(1) > :nth-child(3) > .MuiBox-root > .MuiTypography-root"
      ).should("have.text", "MentroUS ");
      cy.get(":nth-child(1) > :nth-child(4) > .css-1tqqhim > .MuiBox-root > .MuiTypography-root")
        .should("have.text", "Đang hoạt động ")
        .should("be.visible");
    });
  });

  it("MU-62 Create new group", () => {
    cy.wait("@fetchGroups");
    cy.get(".css-1i1w74t > .MuiBox-root > :nth-child(2) > .MuiButtonBase-root").click();
    cy.get("#\\:re\\:").clear("S");
    cy.get("#\\:re\\:").type("SMOKE_TEST");
    cy.get("#\\:rg\\:").click();
    cy.get("#\\:rg\\:-option-0").click();
    cy.get("#\\:ri\\:").click();
    cy.get("#\\:ri\\:-option-4").click();
    cy.get(
      ".css-1qoos23 > :nth-child(5) > .MuiBox-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get("#\\:rl\\:-option-13").click();
    cy.get(
      ':nth-child(7) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > [data-testid="CalendarIcon"]'
    ).click();
    cy.get(".MuiDayPicker-monthContainer > :nth-child(5) > :nth-child(3)").click();
    cy.get("#transition-modal-title").should("be.visible");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root > .material-icons-round").click();
    cy.get(":nth-child(1) > :nth-child(2) > .MuiBox-root > a > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "SMOKE_TEST ");
    cy.get(":nth-child(1) > :nth-child(4) > .css-1tqqhim > .MuiBox-root > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Đang hoạt động ");
  });

  it("MU-63 View group detail from Group Management Page", () => {
    cy.wait("@fetchGroups");
    cy.get("table")
      .contains("TEST_WEB_ADMIN_GROUP")
      .should("be.visible")
      .should("have.text", "TEST_WEB_ADMIN_GROUP ")
      .click();
    cy.get(".css-lthsmf > .MuiTypography-h6").should("have.text", "TEST_WEB_ADMIN_GROUP ");
    cy.get(".css-rxvo3r-MuiTypography-root").should("have.text", "MentroUS ");
    cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
      .should("have.text", "Chi tiết về nhóm")
      .should("be.visible");
  });

  it("MU-64 Delete groups (one or many)", () => {
    cy.get("table")
      .contains("TEST_WEB_ADMIN_GROUP")
      .as("groupTest")
      .should("be.visible")
      .should("have.text", "TEST_WEB_ADMIN_GROUP ");
    cy.get("@groupTest")
      .parents("td")
      .siblings()
      .as("colElements")
      .last()
      .prev()
      .find("input")
      .as("checkbox")
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked")
      .check();
    cy.get("button").should("be.visible").contains(/xóa/i).click();
    cy.get(".swal2-confirm").click();
    cy.get("@colElements")
      .contains(/đã xóa/i)
      .should("be.visible");
    cy.get("@groupTest").should("be.visible").should("have.text", "TEST_WEB_ADMIN_GROUP ");
    cy.restoreDataTest();
  });

  it("MU-68 Block groups (one or many)", () => {
    cy.get("table")
      .contains("TEST_WEB_ADMIN_GROUP")
      .as("groupTest")
      .should("be.visible")
      .should("have.text", "TEST_WEB_ADMIN_GROUP ");
    cy.get("@groupTest")
      .parents("td")
      .siblings()
      .as("colElements")
      .last()
      .prev()
      .find("input")
      .as("checkbox")
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked");

    cy.get("@colElements").contains("Đang hoạt động ").should("be.visible");
    cy.get("@checkbox").check();
    cy.get("button").should("be.visible").contains(/khóa/i).click();
    cy.get(".swal2-confirm").click();
    cy.get("@colElements").contains("Bị khóa ").should("be.visible");
    cy.reload();
    cy.get("@checkbox").check();
    cy.get("@checkbox").should("be.checked");
    cy.contains("Mở khóa").click();
  });

  it("MU-69 Unblock groups (one or many)", () => {
    cy.get("table")
      .contains("TEST_WEB_ADMIN_GROUP")
      .as("groupTest")
      .should("be.visible")
      .should("have.text", "TEST_WEB_ADMIN_GROUP ");
    cy.get("@groupTest")
      .parents("td")
      .siblings()
      .as("colElements")
      .last()
      .prev()
      .find("input")
      .as("checkbox")
      .should("be.visible")
      .should("be.enabled")
      .should("not.be.checked");

    cy.get("@colElements").contains("Đang hoạt động ").should("be.visible");
    cy.get("@checkbox").check();
    cy.get("button").should("be.visible").contains(/khóa/i).click();
    cy.get(".swal2-confirm").click();
    cy.get("@colElements").contains("Bị khóa ").should("be.visible");
    cy.reload();
    cy.get("@checkbox").check();
    cy.get("@checkbox").should("be.checked");
    cy.contains("Mở khóa").click();
  });

  it("MU-71 Export all groups list to Excel", () => {
    cy.wait("@fetchGroups");
    cy.listFileDownloaded().then((before) => {
      cy.intercept("*/groups/export*").as("exportFile");
      cy.get(".css-k1rhy8-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
      cy.wait(3000)
        .listFileDownloaded()
        .then((after) => {
          expect(after.length).to.be.eq(before.length + 1);
          const newFile = after.filter((file) => !before.includes(file))[0];
          expect(newFile).to.have.string(".xlsx");
        });
    });
  });

  it("MU-95 Import group from Excel", () => {
    cy.wait("@fetchGroups");
    // Validate popup modal
    cy.get(":nth-child(3) > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get(".css-1ypgrnf > .MuiBox-root > .MuiButtonBase-root")
      .should("have.text", "Tải tập tin mẫu")
      .should("be.visible");
    cy.get(".drop-file-input").should("be.visible");
    cy.get("#transition-modal-title")
      .should("have.text", "Tải lên danh sách nhóm")
      .should("be.visible");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "checkXác nhận")
      .as("confirmBtn");
    cy.get(".css-13cnr6h-MuiButtonBase-root-MuiButton-root")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "closeHủy")
      .as("cancelBtn");

    // Get file
    cy.fixture("MentorUS_Import_Group_List.xlsx", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get(".drop-file-input > input").attachFile({
          fileContent,
          fileName: "MentorUS_Import_Group_List.xlsx",
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          encoding: "utf8",
          lastModified: new Date().getTime()
        });
        cy.get(".drop-file-preview__item__info > :nth-child(1)")
          .should("be.visible")
          .should("have.text", "MentorUS_Import_Group_List.xlsx");
        cy.get(".drop-file-preview__item__del").should("be.visible");
        // Confirm import
        cy.get("@confirmBtn").click();
      });
  });
});
