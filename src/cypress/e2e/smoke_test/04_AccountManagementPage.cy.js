/// <reference types="cypress-if" />
describe("Account Management Page", () => {
  before(() => {
    cy.restoreDataTest();
  });

  const viewAccountsTable = () => {
    cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
      .should("be.visible")
      .should("have.text", "Quản lý tài khoản");
    cy.get(".css-lx52ja > .css-1ircn5c > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Tài khoản hệ thống");
    cy.get(".css-vi1vhj > .MuiTypography-caption").should("be.visible");
    cy.wait("@getAllAccounts").its("response.statusCode").should("eq", 200);
    cy.get("@getAllAccounts").its("response.body.returnCode").should("eq", 200);
    cy.get("@getAllAccounts").its("response.body.success").should("eq", true);
    cy.get("@getAllAccounts")
      .its("response.body.data.totalItems")
      .then((totalItems) => {
        cy.get(".css-vi1vhj > .MuiTypography-caption").should(
          "have.text",
          `Số lượng kết quả: ${totalItems} `
        );
        cy.get("table").find("tr").should("have.length.at.least", 1);
      });
  };

  const viewAccountDetail = (inputEmail = "20127665") => {
    cy.wait("@getAllAccounts").its("response.statusCode").should("eq", 200);
    cy.get("@getAllAccounts")
      .its("response.body.data")
      .should("not.be.empty")
      .then(({ content }) => {
        const filteredData = content.filter((item) => item.email.includes(inputEmail));
        cy.wrap(filteredData).should("have.length.at.least", 1);
        cy.visit(`/account-management/account-detail/${filteredData[0].id}`);
        cy.wait("@getUserDetail").its("response.statusCode").should("eq", 200);
        cy.contains(filteredData[0].email).should("be.visible");
        cy.contains(filteredData[0].name).should("be.visible");
        cy.get("span")
          .contains(filteredData[0].status ? "Hoạt động" : "Bị khóa")
          .should("be.visible");
      });
  };

  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept("api/users/all-paging*").as("getAllAccounts");
    cy.intercept("api/users/*/detail").as("getUserDetail");
    cy.intercept("DELETE", "api/users*").as("deleteAccount");
    cy.intercept("POST", "api/users*").as("addAccount");
    cy.visit("/account-management");
    viewAccountsTable();
  });

  it("MU-106 View accounts list", () => {});

  it("MU-107 Search for account", () => {
    cy.get("#relationship__searchBox > :nth-child(1) > .MuiPaper-root").as("searchBox");

    cy.get("@searchBox").contains("Tìm kiếm").should("have.text", "Tìm kiếm");
    cy.get("@searchBox").click();
    cy.get("@searchBox").contains("Tên người dùng").should("be.visible");
    cy.get("@searchBox").contains("Vai trò").should("be.visible");
    cy.get("@searchBox").contains("Email").should("be.visible");
    cy.get("@searchBox").contains("Trạng thái").should("be.visible");

    cy.get("#\\:r1\\:").as("name").clear();
    cy.get("#\\:r3\\:").as("role");
    cy.get("#\\:r2\\:").as("email").click();
    cy.get("@email").type("test.acc.mentorus@gmail.com");
    cy.get("#\\:r5\\:").as("status").click();
    cy.get(".MuiAutocomplete-popper").contains("li", "Hoạt động").click();
    cy.get("@searchBox")
      .contains("button", /tìm kiếm/i)
      .as("searchButton")
      .should("be.enabled")
      .should("have.text", "searchTìm kiếm");
    cy.get("@searchButton").click();

    cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 1);
    cy.get("@tableRows").contains("test.acc.mentorus@gmail.com").should("be.visible");
    cy.get("@tableRows").contains("Hoạt động").should("be.visible");
  });

  it("MU-108 View account detail", () => {
    viewAccountDetail();
  });

  it("MU-109 Add new account to system", () => {
    cy.contains("button", /thêm/i).as("addBtn").should("be.visible").should("be.enabled").click();
    cy.get(".group-modal__container").as("addModal").should("be.visible");
    cy.get("@addModal")
      .contains(/thêm tài khoản mới/i)
      .should("be.visible");
    cy.get("@addModal").contains("button", /hủy/i).should("be.visible").should("be.enabled");
    cy.get("@addModal")
      .contains("button", /xác nhận/i)
      .as("confirmBtn")
      .should("be.visible")
      .should("be.enabled");
    cy.get("@addModal")
      .contains(/họ tên/i)
      .should("be.visible");
    cy.get("@addModal").contains(/email/i).should("be.visible");
    cy.get("@addModal")
      .contains(/vai trò/i)
      .should("be.visible");
    cy.get("@addModal")
      .find("input[placeholder='Nhập họ tên chủ tài khoản']")
      .as("nameInput")
      .should("be.visible");
    cy.get("@addModal")
      .find("input[placeholder='Nhập email']")
      .as("emailInput")
      .should("be.visible");

    cy.get("@nameInput").clear();
    cy.get("@nameInput").type("ADD_ACCOUNT");

    cy.get("@emailInput").clear();
    cy.get("@emailInput").type("smoktest@gmail.com");
    cy.get("@confirmBtn").click();
    cy.wait("@addAccount").its("response.statusCode").should("eq", 200);
    cy.wait("@getAllAccounts").its("response.statusCode").should("eq", 200);

    cy.restoreDataTest();
  });

  it("MU-110 Delete accounts", () => {
    cy.intercept({
      url: "api/users/all-paging*",
      times: 1
    }).as("getAllAccounts");
    cy.intercept({ url: "api/users/all-paging*", times: 1 }).as("getAllAccountsRecall");

    cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 2);
    cy.get("@tableRows").contains("20127665").parents("tr").as("testRows").should("be.visible");
    cy.get("@testRows")
      .contains(/Hoạt động/i)
      .should("be.visible");

    cy.get("@testRows").find("input[type=checkbox]").as("checkbox").click();
    cy.contains("button", "Xóa").as("deleteBtn").should("be.enabled").should("be.visible");
    cy.get("@deleteBtn").click();
    cy.get(".swal2-confirm").click();
    cy.wait("@deleteAccount").its("response.statusCode").should("eq", 200);
    cy.wait("@getAllAccounts").its("response.statusCode").should("eq", 200);
    cy.wait("@getAllAccountsRecall")
      .its("response.body.data.content")
      .then((content) => {
        const filteredData = content.filter((item) => item.email.includes("20127665"));
        cy.wrap(filteredData).should("have.length", 0);
      });
    cy.restoreDataTest();
  });

  it("MU-111 Block/Unblock accounts", () => {
    cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 2);
    cy.get("@tableRows").contains("20127665").parents("tr").as("testRows").should("be.visible");
    cy.get("@testRows")
      .contains(/Hoạt động/i)
      .should("be.visible");

    cy.get("@testRows").find("input[type=checkbox]").as("checkbox").click();
    cy.contains("button", "Khóa").as("blockBtn").should("be.enabled").should("be.visible");
    cy.get("@blockBtn").click();
    cy.get(".swal2-confirm").click();
    cy.get("@testRows")
      .contains(/Bị khóa/i)
      .should("be.visible");
    cy.get("@checkbox").if("not.checked").check();
    cy.get("@checkbox").should("be.checked");
    cy.contains("button", "Mở khóa").as("unblockBtn").should("be.enabled").should("be.visible");
    cy.get("@unblockBtn").click();
  });

  it("MU-112 Export all accounts to Excel", () => {
    cy.intercept("/api/users/export*").as("exportFile");
    cy.listFileDownloaded().then((before) => {
      cy.get("button").contains("Xuất excel").click();
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

  context("Account Detail Actions", () => {
    beforeEach(() => {});

    it("MU-113 Update account info", () => {
      viewAccountDetail("20127665");

      cy.get(".css-1w97t8w > :nth-child(2) > .MuiButtonBase-root")
        .should("be.visible")
        .should("be.enabled")
        .should("have.text", "edit");
      cy.get(".css-1w97t8w > :nth-child(2) > .MuiButtonBase-root").click();
      cy.contains("Chỉnh sửa Tài khoản").should("be.visible");
      cy.contains("Cập nhật thông tin cho email ").should("be.visible");
      cy.contains("Email cá nhân").should("be.visible");
      cy.contains("Số điện thoại").should("be.visible");
      cy.contains("Ngày sinh").should("be.visible");
      cy.contains("Họ và tên (*)").should("be.visible");
      cy.contains("Giới tính (*)").should("be.visible");
      cy.contains("Trạng thái (*)").should("be.visible");
      cy.contains("Vai trò (*)").should("be.visible");
      cy.get("input[placeholder='Nhập email cá nhân']").as("personalEmail").clear();
      cy.get("@personalEmail").type("duongquangvinh2210@gmail.com");
      cy.get("input[placeholder='Nhập số điện thoại']").as("phoneNumber").clear();
      cy.get("@phoneNumber").type("0972360214");
      cy.contains("button", /Xác nhận/i)
        .should("be.visible")
        .should("be.enabled")
        .should("have.text", "checkXác nhận");
      cy.get(":nth-child(5) > .MuiBox-root > .MuiFormGroup-root").click();
      cy.contains("button", /Hủy/i)
        .should("be.enabled")
        .should("be.visible")
        .should("have.text", "closeHủy");
      cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root").click();
      cy.contains("strong", "0972360214").should("be.visible");
      cy.contains("strong", "duongquangvinh2210@gmail.com").should("be.visible");

      cy.get(".css-1w97t8w > :nth-child(2) > .MuiButtonBase-root").click();
      cy.get("@personalEmail").click();
      cy.get("@personalEmail").clear("duongquangvinh2210@gmail.com");
      cy.get("@phoneNumber").clear("0972360214");
      cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
    });

    it("MU-114 Block/Unblock account", () => {
      viewAccountDetail("20127665");

      cy.get("strong").contains("Hoạt động").should("be.visible").should("have.text", "Hoạt động");
      cy.get(":nth-child(4) > .MuiButtonBase-root")
        .should("be.visible")
        .should("be.enabled")
        .should("have.text", "lock_person")
        .click();
      cy.get(".swal2-confirm").click();
      cy.get("strong").contains("Bị khóa").should("be.visible").should("have.text", "Bị khóa");
      cy.get(":nth-child(4) > .MuiButtonBase-root")
        .should("be.visible")
        .should("be.enabled")
        .should("have.text", "lock_open")
        .click();
      cy.get("strong").contains("Hoạt động").should("be.visible").should("have.text", "Hoạt động");
    });

    // it("MU-115 ...", () => {});

    it("MU-116 Delete account", () => {
      viewAccountDetail("20127665");
      cy.intercept("DELETE", "api/users/*").as("deleteAccount");

      cy.get(":nth-child(3) > .MuiButtonBase-root").as("deleteBtn").should("be.visible").click();
      cy.contains("Xóa tài khoản?").should("be.visible");
      cy.contains("Bạn chắc chắn muốn xóa tài khoản có email").should("be.visible");
      cy.contains("button", /Đồng ý/i)
        .should("be.visible")
        .should("be.enabled")
        .click();
      cy.wait("@deleteAccount").its("response.statusCode").should("eq", 200);
      cy.restoreDataTest();
    });

    it("MU-117 Export groups that account is Mentor", () => {
      viewAccountDetail("test.acc.mentorus@gmail.com");

      cy.get(":nth-child(1) > .MuiPaper-root > .css-mzbh3l")
        .as("mentorGroupTable")
        .should("be.visible")
        .contains("Nhóm quản lý")
        .should("be.visible");
      cy.get("@mentorGroupTable")
        .contains("button", "Xuất excel")
        .as("exportBtn")
        .should("be.visible")
        .should("be.enabled");

      cy.intercept("api/users/*/mentorGroups/export*").as("exportFile");
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

    it("MU-118 Export groups that account is Mentee", () => {
      viewAccountDetail("test.acc.mentorus@gmail.com");

      cy.get(":nth-child(2) > .MuiPaper-root > .css-mzbh3l")
        .as("menteeGroupTable")
        .should("be.visible")
        .contains("Nhóm thành viên")
        .should("be.visible");
      cy.get("@menteeGroupTable")
        .contains("button", "Xuất excel")
        .as("exportBtn")
        .should("be.visible")
        .should("be.enabled");

      cy.intercept("api/users/*/menteeGroups/export*").as("exportFile");
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
