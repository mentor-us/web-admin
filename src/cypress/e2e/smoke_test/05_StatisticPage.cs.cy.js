/// <reference types="cypress-if" />
describe("Statistic Page", () => {
  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept("api/analytic/chart*").as("getChart");
    cy.intercept("api/analytic/find*").as("findGroups");
    cy.intercept("api/analytic?").as("getAll");
    cy.visit("/statistic");
    cy.wait("@getAll").its("response.statusCode").should("eq", 200);
    cy.wait("@findGroups").its("response.statusCode").should("eq", 200);
    cy.get("@getAll").its("response.body.data").as("totalData");
    cy.get("@totalData").then((totalData) => {
      cy.contains(`${totalData.totalGroups} Tổng số nhóm`).should("be.visible");
      cy.contains(`${totalData.activeGroups} Các nhóm đang hoạt động`).should("be.visible");
      cy.contains(`${totalData.totalUsers} Tổng số tài khoản`).should("be.visible");
      cy.contains(`${totalData.activeUsers} Các tài khoản hoạt động`).should("be.visible");
      cy.contains(`${totalData.totalMeetings} Tổng số cuộc hẹn`).should("be.visible");
      cy.contains(`${totalData.totalMessages} Tổng số tin nhắn`).should("be.visible");
      cy.contains(`${totalData.totalTasks} Tổng số công việc`).should("be.visible");
    });

    cy.wait("@findGroups")
      .its("response.body.data.totalItems")
      .then((totalItems) => {
        cy.contains(`Số lượng kết quả: ${totalItems}`).should("be.visible");
      });
  });

  it("MU-120 View generic statistic", () => {});

  it("MU-121 View generic statistic chart", () => {
    cy.get(".css-14yffjz > .css-1fvfpv2 > .MuiBox-root > canvas").should("be.visible");
    cy.get(".css-daa9wp > .css-1fvfpv2 > .MuiBox-root > canvas").should("be.visible");
  });

  it("MU-122 View group's general statistic table", () => {
    cy.get("@findGroups")
      .its("response.body.data.totalItems")
      .then((totalItems) => {
        cy.contains(`Số lượng kết quả: ${totalItems}`).should("be.visible");
      });

    cy.get("table").should("be.visible").find("tr").should("have.length.at.least", 2);
    cy.get(".css-1josaac").contains("Danh sách hoạt động nhóm").should("be.visible");
  });

  it("MU-123 Search groups statistic", () => {
    cy.get(".statistic_search-container-searchBox").as("searchBox").should("be.visible");
    cy.get("@searchBox").contains("Tên nhóm").should("be.visible");
    cy.get("@searchBox").contains("Trạng thái").should("be.visible");
    cy.get("#\\:r4\\:").clear();
    cy.get("#\\:r4\\:").type("TEST_WEB_ADMIN_GROUP");
    cy.get("#\\:r5\\:").click();
    cy.get("#\\:r5\\:-listbox").contains("li", "Đang hoạt động").should("be.visible").click();
    cy.get("@searchBox")
      .contains("button", "Tìm kiếm")
      .as("searchBtn")
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "searchTìm kiếm");
    cy.get("@searchBtn").click();

    cy.wait("@findGroups").its("response.statusCode").should("eq", 200);
    cy.get("@findGroups")
      .its("response.body.data")
      .then((data) => {
        cy.contains(`Số lượng kết quả: ${data.totalItems}`).should("be.visible");
        cy.get("table")
          .find("tr")
          .eq(1)
          .as("resultRow")
          .should("be.visible")
          .and("have.length.at.least", 1);

        const groupResult = data.groups.find((item) => item.name === "TEST_WEB_ADMIN_GROUP");
        cy.wrap(groupResult)
          .should("not.be.null")
          .and("not.be.undefined")
          .and("not.be.empty")
          .and("be.a", "object")
          .as("groupResult");
        cy.get("@groupResult").should("have.property", "name").and("eq", "TEST_WEB_ADMIN_GROUP");
        cy.get("@groupResult").should("have.property", "status").and("eq", "ACTIVE");

        cy.get("@resultRow").contains("td", "TEST_WEB_ADMIN_GROUP").should("be.visible");
        cy.get("@resultRow").contains("td", "Đang hoạt động ").should("be.visible");
      });
  });

  it("MU-124 Export statistic group table to Excel", () => {
    cy.get(".css-1josaac")
      .as("container")
      .contains("Danh sách hoạt động nhóm")
      .should("be.visible");
    cy.get("@container").contains("button", "Xuất excel").as("exportBtn").should("be.visible");
    cy.intercept("api/analytic/groups/export*").as("exportFile");
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

  const viewGroupDetailStatistic = () => {
    cy.get("table").find("td").contains("TEST_WEB_ADMIN_GROUP").click();
  };

  context("Statistic Detail Page", () => {
    beforeEach(() => {
      viewGroupDetailStatistic();
    });

    it("MU-125 View group detail statistic", () => {});
    context("Export functionality", () => {
      const viewExportModal = () => {
        cy.get("button[aria-label='Xuất hoạt động chi tiết về nhóm']").click();
        cy.contains("Xuất hoạt động về nhóm").should("be.visible");
        cy.contains("button", "Xuất báo cáo")
          .as("briefExportBtn")
          .should("be.visible")
          .and("be.enabled");
        cy.contains("button", "Xuất chi tiết")
          .as("detailExportBtn")
          .should("be.visible")
          .and("be.enabled");
        cy.contains("button", "Hủy").as("cancelBtn").should("be.visible").and("be.enabled");
        cy.get(".css-1ud912l")
          .find("input[type='checkbox']")
          .should("be.visible")
          .each((checkbox) => {
            cy.wrap(checkbox).if("checked").should("be.checked").else().check();
          });
      };

      it("MU-126 Export group member from group detail statistic page", () => {
        cy.get(".css-1josaac")
          .as("container")
          .contains("Danh sách hoạt động thành viên")
          .should("be.visible");
        cy.get("@container").contains("button", "Xuất excel").as("exportBtn").should("be.visible");
        cy.intercept("api/analytic/*/export*").as("exportFile");
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

      it("MU-127 Export brief statistic report (pdf)", () => {
        viewExportModal();
        cy.intercept("api/analytic/report?groupId=*&query=MEETINGS,MESSAGES,TASKS").as(
          "exportFile"
        );
        cy.listFileDownloaded().then((before) => {
          cy.get("@briefExportBtn").click();
          cy.wait("@exportFile")
            .wait(10000)
            .listFileDownloaded()
            .then((after) => {
              expect(after.length).to.be.eq(before.length + 1);
              const newFile = after.filter((file) => !before.includes(file))[0];
              expect(newFile).to.have.string(".pdf");
            });
        });
      });

      it("MU-128 Export all tasks, messages, meetings detail of a group to Excel", () => {
        viewExportModal();
        cy.intercept("api/analytic/log?groupId=*&query=MEETINGS,MESSAGES,TASKS").as("exportFile");
        cy.listFileDownloaded().then((before) => {
          cy.get("@detailExportBtn").click();
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
    it("MU-129 Search group's members", () => {
      cy.intercept(
        "api/analytic/find/*?email=test.acc.mentorus@gmail.com&name=Test%20accounts&role=MENTEE"
      ).as("searchMemberApi");
      cy.get(".statistic_search-container").as("searchMemberBox").should("be.visible");
      cy.get("@searchMemberBox").contains("Email").should("be.visible");
      cy.get("@searchMemberBox").contains("Họ tên").should("be.visible");
      cy.get("@searchMemberBox").contains("Vai trò").should("be.visible");
      cy.get("@searchMemberBox").contains("Lần hoạt động gần nhất").should("be.visible");
      cy.get("@searchMemberBox")
        .contains("button", "Tìm kiếm")
        .as("searchBtn")
        .should("be.visible");

      cy.get("#\\:re\\:").click();
      cy.get("#\\:re\\:").clear();
      cy.get("#\\:re\\:").type("test.acc.mentorus@gmail.com");
      cy.get("#\\:rf\\:").clear();
      cy.get("#\\:rf\\:").type("Test accounts");
      cy.get("#\\:rg\\:").click();
      cy.get("#\\:rg\\:-listbox").contains("li", "Mentee").click();

      cy.get("@searchBtn").click();
      cy.wait("@searchMemberApi").its("response.statusCode").should("eq", 200);
      cy.get("@searchMemberApi")
        .its("response.body.data")
        .then((data) => {
          cy.get(".css-vi1vhj > .MuiTypography-caption")
            .should("be.visible")
            .should("have.text", `Số lượng kết quả: ${data.length} `);
          cy.get("table").find("tr").as("rowResults").should("have.length.at.least", 2);
          cy.wrap(data)
            .should("not.be.null")
            .and("not.be.undefined")
            .and("not.be.empty")
            .and("be.a", "array")
            .and("have.length.at.least", 1)
            .as("searchResult");

          cy.get("@searchResult").each((item, index) => {
            cy.get("table")
              .find("tr")
              .eq(index + 1)
              .as("rowResult")
              .should("be.visible");
            cy.get("@rowResult").contains("td", item.email).should("be.visible");
            cy.get("@rowResult").contains("td", item.name).should("be.visible");
            cy.get("@rowResult")
              .contains("td", item.role, { matchCase: false })
              .should("be.visible");
          });
        });
    });
  });
});
