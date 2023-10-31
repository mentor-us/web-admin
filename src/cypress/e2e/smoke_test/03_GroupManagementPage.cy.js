/// <reference types="cypress-if" />
describe("Group Management Page", () => {
  before(() => {
    cy.restoreDataTest();
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
    cy.get("@checkbox").if("not.checked").check();
    cy.get("button").should("be.visible").contains(/khóa/i).click();
    cy.get(".swal2-confirm").click();
    cy.get("@colElements").contains("Bị khóa ").should("be.visible");
    cy.get("@checkbox").if("checked").should("be.checked").else().check();
    cy.contains("Mở khóa").should("be.visible").click();
    cy.get("@colElements").contains("Đang hoạt động ").should("be.visible");
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
    cy.get("@checkbox").if("not.checked").check();
    cy.get("button").should("be.visible").contains(/khóa/i).click();
    cy.get(".swal2-confirm").click();
    cy.get("@colElements").contains("Bị khóa ").should("be.visible");
    cy.get("@checkbox").if("checked").should("be.checked").else().check();
    cy.contains("Mở khóa").should("be.visible").click();
    cy.get("@colElements").contains("Đang hoạt động ").should("be.visible");
  });

  it("MU-71 Export all groups list to Excel", () => {
    cy.wait("@fetchGroups");
    cy.listFileDownloaded().then((before) => {
      cy.intercept("*/groups/export*").as("exportFile");
      cy.get(".css-k1rhy8-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
      cy.wait(10000)
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

  context("Group Detail Page", () => {
    beforeEach(() => {
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

    context("Add/Delete mentors", () => {
      it("MU-73 Add new mentors to a group", () => {
        cy.get(":nth-child(1) > .MuiPaper-root > .css-mzbh3l").as("mentorPanel");
        cy.get("@mentorPanel")
          .contains(/Danh sách mentor/i)
          .should("be.visible");
        cy.get("@mentorPanel")
          .contains(/Xuất excel/i)
          .as("exportBtn")
          .should("be.visible");
        cy.get("@mentorPanel").contains(/thêm/i).as("addBtn").should("be.visible").click();

        cy.get(".MuiTypography-h5").should("be.visible").should("have.text", "Thêm Mentor");
        cy.get(".relationship__searchBox-item > .MuiTypography-root")
          .should("be.visible")
          .should("have.text", "Email Mentor (*)");
        cy.contains("button", /xác nhận/i)
          .as("confirmBtn")
          .should("be.visible")
          .should("be.enabled");
        cy.contains("button", /hủy/i).should("be.visible").should("be.enabled");
        cy.get("#\\:rn\\:").click();
        cy.get("#\\:rn\\:").click();
        cy.get("#\\:rn\\:").clear();
        cy.get("#\\:rn\\:").type("20127665@student.hcmus.edu.vn{enter}");
        cy.get(".MuiChip-label")
          .should("have.text", "20127665@student.hcmus.edu.vn")
          .should("be.visible");
        cy.get("@confirmBtn").click();

        cy.get(":nth-child(1) > .MuiPaper-root > .css-afbxdw").find("table").as("mentorTable");
        cy.get("@mentorTable").contains("tr", "20127665@student.hcmus.edu.vn").should("be.visible");
      });

      it("MU-74 Delete mentors from a group", () => {
        cy.get(":nth-child(1) > .MuiPaper-root > .css-afbxdw").find("table").as("mentorTable");
        cy.get("@mentorTable")
          .contains("tr", "20127665@student.hcmus.edu.vn")
          .as("row")
          .should("be.visible");
        cy.get("@row").find("td").last().find("span").as("moreBtn").click();
        cy.contains("li", /xóa/i).should("be.visible").click();
        cy.get(".swal2-confirm").click();
      });
    });

    context("Add/Delete mentees", () => {
      it("MU-97 Add new mentees to a group", () => {
        cy.get(":nth-child(2) > .MuiPaper-root > .css-mzbh3l").as("menteePanel");
        cy.get("@menteePanel")
          .contains(/Danh sách mentee/i)
          .should("be.visible");
        cy.get("@menteePanel")
          .contains(/Xuất excel/i)
          .as("exportBtn")
          .should("be.visible");
        cy.get("@menteePanel").contains(/thêm/i).as("addBtn").should("be.visible").click();

        cy.get(".MuiTypography-h5").should("be.visible").should("have.text", "Thêm Mentee");
        cy.get(".relationship__searchBox-item > .MuiTypography-root")
          .should("be.visible")
          .should("have.text", "Email Mentee (*)");
        cy.contains("button", /xác nhận/i)
          .as("confirmBtn")
          .should("be.visible")
          .should("be.enabled");
        cy.contains("button", /hủy/i).should("be.visible").should("be.enabled");
        cy.get("#\\:rn\\:").click();
        cy.get("#\\:rn\\:").click();
        cy.get("#\\:rn\\:").clear();
        cy.get("#\\:rn\\:").type("20127665@student.hcmus.edu.vn{enter}");
        cy.get(".MuiChip-label")
          .should("have.text", "20127665@student.hcmus.edu.vn")
          .should("be.visible");
        cy.get("@confirmBtn").click();

        cy.get(":nth-child(2) > .MuiPaper-root > .css-afbxdw").find("table").as("menteeTable");
        cy.get("@menteeTable").contains("tr", "20127665@student.hcmus.edu.vn").should("be.visible");
      });

      it("MU-134 Delete mentees from a group", () => {
        cy.get(":nth-child(2) > .MuiPaper-root > .css-afbxdw").find("table").as("menteeTable");
        cy.get("@menteeTable")
          .contains("tr", "20127665@student.hcmus.edu.vn")
          .as("row")
          .should("be.visible");
        cy.get("@row").find("td").last().find("span").as("moreBtn").click();
        cy.contains("li", /xóa/i).should("be.visible").click();
        cy.get(".swal2-confirm").click();
      });
    });

    it("MU-96 Change user role from Mentee to Mentor and reverse", () => {
      // From Mentee to Mentor
      cy.get(":nth-child(2) > .MuiPaper-root > .css-afbxdw").find("table").as("menteeTable");
      cy.get("@menteeTable")
        .contains("test.acc.mentorus")
        .parents("td")
        .siblings()
        .as("menteeColElements")
        .last()
        .find("span")
        .as("menteeMoreBtn")
        .click();

      cy.get("#simple-menu > .MuiPaper-root")
        .as("menteeMenu")
        .contains(/Chuyển thành Mentor/i)
        .click();
      cy.get(".swal2-confirm").click();

      // From Mentor to Mentee
      cy.get(":nth-child(1) > .MuiPaper-root > .css-afbxdw").find("table").as("mentorTable");
      cy.get("@mentorTable")
        .contains("test.acc.mentorus")
        .parents("td")
        .siblings()
        .as("mentorColElements")
        .last()
        .find("span")
        .as("mentorMoreBtn")
        .click();

      cy.get("#simple-menu > .MuiPaper-root")
        .as("mentorMenu")
        .contains(/Chuyển thành Mentee/i)
        .click();
      cy.get(".swal2-confirm").click();
    });

    it("MU-132 Export mentee list to Excel", () => {
      cy.get(":nth-child(2) > .MuiPaper-root > .css-mzbh3l").as("menteePanel");
      cy.get("@menteePanel")
        .contains(/Danh sách mentee/i)
        .should("be.visible");
      cy.get("@menteePanel")
        .contains(/Xuất excel/i)
        .as("exportBtn")
        .should("be.visible");
      cy.intercept("api/groups/*/mentees/export*").as("exportFile");
      cy.listFileDownloaded().then((before) => {
        cy.get("@exportBtn").click();
        cy.wait("@exportFile")
          .wait(10000)
          .listFileDownloaded()
          .then((after) => {
            expect(after.length).to.be.eq(before.length + 1);
            const newFile = after.filter((file) => !before.includes(file))[0];
            expect(newFile).to.have.string(".xlsx");
          });
      });
    });

    it("MU-133 Export mentor list to Excel", () => {
      cy.get(":nth-child(1) > .MuiPaper-root > .css-mzbh3l").as("mentorPanel");
      cy.get("@mentorPanel")
        .contains(/Danh sách mentor/i)
        .should("be.visible");
      cy.get("@mentorPanel")
        .contains(/Xuất excel/i)
        .as("exportBtn")
        .should("be.visible");
      cy.intercept("api/groups/*/mentors/export*").as("exportFile");
      cy.listFileDownloaded().then((before) => {
        cy.get("@exportBtn").click();
        cy.wait("@exportFile")
          .wait(10000)
          .listFileDownloaded()
          .then((after) => {
            expect(after.length).to.be.eq(before.length + 1);
            const newFile = after.filter((file) => !before.includes(file))[0];
            expect(newFile).to.have.string(".xlsx");
          });
      });
    });
  });
});
