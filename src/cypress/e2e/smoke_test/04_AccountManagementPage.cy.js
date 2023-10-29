/// <reference types="cypress-if" />
describe("Account Management Page", () => {
  before(() => {
    // cy.restoreDataTest();
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

  const viewAccountDetail = () => {
    cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 2);
    cy.get("@tableRows").eq(1).as("firstRow").click();
    cy.get("@firstRow")
      .find("td")
      .eq(1)
      .as("rowEmail")
      .should("be.visible")
      .invoke("text")
      .invoke("trim")
      .as("email")
      .then(cy.log);
    cy.get("@firstRow")
      .find("td")
      .eq(2)
      .as("rowName")
      .should("be.visible")
      .invoke("text")
      .invoke("trim")
      .as("name")
      .then(cy.log);
    cy.get("@firstRow")
      .find("td")
      .eq(4)
      .as("rowStatus")
      .should("be.visible")
      .invoke("text")
      .invoke("trim")
      .as("status")
      .then(cy.log);
    cy.get("@rowEmail").click();
    cy.wait("@getUserDetail").its("response.statusCode").should("eq", 200);
    cy.getMany(["@email", "@name", "@status"]).then(([userEmail, userName, userStatus]) => {
      cy.contains(userEmail).should("be.visible");
      cy.contains(userName).should("be.visible");
      cy.get("span").contains(userStatus).should("be.visible");
    });
  };

  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept("api/users/all-paging*").as("getAllAccounts");
    cy.intercept("api/users/*/detail").as("getUserDetail");
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

  // it("MU-109 Add new account to system", () => {
  //   cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 2);
  //   cy.get("@tableRows").eq(1).as("firstRow").click();
  //   cy.get("@firstRow")
  //     .find("td")
  //     .eq(1)
  //     .as("rowEmail")
  //     .should("be.visible")
  //     .invoke("text")
  //     .invoke("trim")
  //     .as("email")
  //     .then(cy.log);
  //   cy.get("@firstRow")
  //     .find("td")
  //     .eq(2)
  //     .as("rowName")
  //     .should("be.visible")
  //     .invoke("text")
  //     .invoke("trim")
  //     .as("name")
  //     .then(cy.log);
  //   cy.get("@firstRow")
  //     .find("td")
  //     .eq(4)
  //     .as("rowStatus")
  //     .should("be.visible")
  //     .invoke("text")
  //     .invoke("trim")
  //     .as("status")
  //     .then(cy.log);
  //   cy.get("@rowEmail").click();
  //   cy.wait("@getUserDetail").its("response.statusCode").should("eq", 200);
  //   cy.getMany(["@email", "@name", "@status"]).then(([userEmail, userName, userStatus]) => {
  //     cy.contains(userEmail).should("be.visible");
  //     cy.contains(userName).should("be.visible");
  //     cy.get("span").contains(userStatus).should("be.visible");
  //   });
  // });

  // it("MU-110 Delete accounts", () => {
  //   cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 2);
  //   cy.get("@tableRows").eq(1).as("firstRow").click();
  //   cy.get("@firstRow")
  //     .find("td")
  //     .eq(1)
  //     .as("rowEmail")
  //     .should("be.visible")
  //     .invoke("text")
  //     .invoke("trim")
  //     .as("email")
  //     .then(cy.log);
  //   cy.get("@firstRow")
  //     .find("td")
  //     .eq(2)
  //     .as("rowName")
  //     .should("be.visible")
  //     .invoke("text")
  //     .invoke("trim")
  //     .as("name")
  //     .then(cy.log);
  //   cy.get("@firstRow")
  //     .find("td")
  //     .eq(4)
  //     .as("rowStatus")
  //     .should("be.visible")
  //     .invoke("text")
  //     .invoke("trim")
  //     .as("status")
  //     .then(cy.log);
  //   cy.get("@rowEmail").click();
  //   cy.wait("@getUserDetail").its("response.statusCode").should("eq", 200);
  //   cy.getMany(["@email", "@name", "@status"]).then(([userEmail, userName, userStatus]) => {
  //     cy.contains(userEmail).should("be.visible");
  //     cy.contains(userName).should("be.visible");
  //     cy.get("span").contains(userStatus).should("be.visible");
  //   });
  // });

  it("MU-111 Block/Unblock accounts", () => {
    cy.get("table").find("tr").as("tableRows").should("have.length.at.least", 2);
    cy.get("@tableRows")
      .contains("test.acc.mentorus@gmail.com")
      .parents("tr")
      .as("testRows")
      .should("be.visible");
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
    beforeEach(() => {
      viewAccountDetail();
    });

    it("MU-113 Update account info", () => {
      cy.get(".css-1w97t8w > :nth-child(2) > .MuiButtonBase-root")
        .should("be.visible")
        .should("be.enabled")
        .should("have.text", "edit");
      cy.get(".css-1w97t8w > :nth-child(2) > .MuiButtonBase-root").click();
      cy.get(".MuiTypography-h5").should("be.visible").should("have.text", "Chỉnh sửa Tài khoản");
      cy.get(".css-1s0ycc1 > .MuiTypography-root")
        .should("be.visible")
        .should("have.text", "Cập nhật thông tin cho email test.acc.mentorus@gmail.com");
      cy.get(".css-1qoos23 > :nth-child(1) > .MuiTypography-root")
        .should("be.visible")
        .should("have.text", "Email cá nhân");
      cy.get(".css-1qoos23 > :nth-child(2) > .MuiTypography-root")
        .should("be.visible")
        .should("have.text", "Số điện thoại");
      cy.get(".css-1qoos23 > :nth-child(3) > .MuiTypography-root")
        .should("be.visible")
        .should("have.text", "Ngày sinh");
      cy.get(":nth-child(4) > .MuiTypography-root")
        .should("be.visible")
        .should("have.text", "Họ và tên (*)");
      cy.get(":nth-child(5) > .MuiTypography-body2")
        .should("be.visible")
        .should("have.text", "Giới tính (*)");
      cy.get(":nth-child(6) > .MuiTypography-body2")
        .should("be.visible")
        .should("have.text", "Trạng thái (*)");
      cy.get(":nth-child(7) > .MuiTypography-root")
        .should("be.visible")
        .should("have.text", "Vai trò (*)");
      cy.get("#\\:rl\\:").as("userName").should("be.visible").should("have.value", "Test accounts");
      cy.get("#\\:ri\\:").as("personalEmail").clear();
      cy.get("@personalEmail").type("duongquangvinh2210@gmail.com");
      cy.get("#\\:rj\\:").as("phoneNumber").clear();
      cy.get("@phoneNumber").type("0972360214");
      cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root")
        .should("be.visible")
        .should("be.enabled")
        .should("have.text", "checkXác nhận");
      cy.get(":nth-child(5) > .MuiBox-root > .MuiFormGroup-root").click();
      cy.get(".css-13cnr6h-MuiButtonBase-root-MuiButton-root")
        .should("be.enabled")
        .should("be.visible")
        .should("have.text", "closeHủy");
      cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root").click();
      cy.get(
        '.css-11ptvp6 > [style="margin-top: 1rem; height: 4.5rem;"] > .css-13oxgqj > .css-q1o7qq > .MuiTypography-button > strong'
      )
        .should("be.visible")
        .should("have.text", "0972360214");
      cy.get(
        ':nth-child(3) > [style="margin-top: 1rem; height: 4.5rem;"] > .css-13oxgqj > .css-q1o7qq > .MuiTypography-button > strong'
      )
        .should("be.visible")
        .should("have.text", "duongquangvinh2210@gmail.com");
      cy.get(".css-1w97t8w > :nth-child(2) > .MuiButtonBase-root").click();
      cy.get("#\\:rq\\:").click();
      cy.get("#\\:rq\\:").clear("duongquangvinh2210@gmail.com");
      cy.get("#\\:rr\\:").clear("0972360214");
      cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
    });

    it("MU-114 Block/Unblock account", () => {
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

    // it("MU-116 Delete account", () => {});

    it("MU-117 Export groups that account is Mentor", () => {
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
