describe("Categories Management Page", () => {
  before(() => {
    cy.restoreDataTest();
  });

  beforeEach(() => {
    cy.loginWithPassword();
    cy.intercept("GET", "/api/group-categories").as("fetchCategories");
    cy.visit("/group-category");
    // Check in category page
    cy.url().should("include", "/group-category");
    cy.get(".css-1n8f1nf > .MuiBox-root > .MuiTypography-h6")
      .should("be.visible")
      .should("have.text", "Quản lý loại nhóm");
    cy.get(".css-lx52ja > .css-1ircn5c > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Danh sách loại nhóm");
    cy.get(".css-vi1vhj > .MuiTypography-caption").should("be.visible");
    cy.get(".MuiTypography-caption > span").should("be.visible");
  });

  it("MU-65 View Categories table", () => {
    cy.wait("@fetchCategories")
      .its("response.body.data.length")
      .then((length) => {
        cy.get(".MuiTypography-caption > span").should("have.text", length);
        cy.get("table").find("tr").should("have.length.at.least", 1);
      });
  });

  it("MU-66 Search category", () => {
    cy.intercept("GET", "/api/group-categories/find*").as("findCategories");
    cy.get(".MuiAccordionSummary-content > .MuiTypography-root").click();
    cy.contains("button", /tìm kiếm/i)
      .as("searchBtn")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "searchTìm kiếm");
    cy.get(".MuiAccordionSummary-content > .MuiTypography-root").should("be.visible");
    cy.get(":nth-child(1) > .relationship__searchBox-item > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Loại nhóm");
    cy.get(":nth-child(2) > .relationship__searchBox-item > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Trạng thái");
    cy.get("#\\:r1\\:").clear("");
    cy.get("#\\:r1\\:").type("men");
    cy.get("#\\:r2\\:").click();
    cy.get("#\\:r2\\:-listbox")
      .contains("li", /hoạt động/i)
      .should("be.visible")
      .click();
    cy.get("@searchBtn").click();
    cy.get("table").contains(/men/i).as("mentroUs").should("be.visible");
    cy.get("@mentroUs")
      .parents("td")
      .siblings()
      .contains(/hoạt động/i)
      .should("be.visible")
      .should("have.text", "Hoạt động ");
    cy.get("#\\:r2\\:").should("have.value", "Hoạt động");
    cy.get("#\\:r1\\:").should("have.value", "men");

    cy.wait("@findCategories")
      .its("response.body.data.totalItems")
      .then((totalItems) => {
        cy.get(".MuiTypography-caption > span").should("have.text", totalItems);
        cy.get("table").find("tr").should("have.length.at.least", 1);
      });
  });

  it("MU-67 Add new category", () => {
    cy.get(".css-j60lp5-MuiButtonBase-root-MuiButton-root").click();
    // Check popup modal
    cy.get(".group-modal__container > .MuiTypography-h5")
      .as("title")
      .should("have.text", "Thêm mới loại nhóm")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(1) > .MuiTypography-root")
      .should("have.text", "Tên loại nhóm (*)")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(2) > .MuiTypography-root")
      .should("have.text", "Mô tả")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(3) > .MuiTypography-root")
      .should("have.text", "Biểu tượng (*)")
      .should("be.visible");
    cy.get(":nth-child(4) > .MuiTypography-root").should("have.text", "Quyền ứng dụng");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root")
      .as("confirmBtn")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "checkXác nhận");
    cy.get(".css-13cnr6h-MuiButtonBase-root-MuiButton-root")
      .should("be.enabled")
      .should("be.visible")
      .should("have.text", "closeHủy");

    // Input data
    cy.get("#\\:r6\\:").clear();
    cy.get("#\\:r6\\:").type("ADD_GROUP_SMOKE_TEST");
    cy.get("#\\:r7\\:").click();
    cy.get("#\\:r7\\:").clear();
    cy.get("#\\:r7\\:").type("CREATE_NEW_DESCRIPTION");
    cy.get("#\\:r9\\:").click();
    cy.get("#\\:r9\\:-option-0 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get("#\\:r9\\:-option-1 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get("#\\:r9\\:-option-2 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get(":nth-child(4) > .MuiTypography-root").click();
    cy.get("span.MuiAutocomplete-tag").should("have.text", "+2");
    cy.get(".group-modal__container").click();
    cy.get(".MuiChip-label").should("have.text", "Quyền gửi file");

    cy.get("@confirmBtn").click();
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiBox-root > .MuiTypography-root"
    )
      .should("be.visible")
      .should("have.text", "ADD_GROUP_SMOKE_TEST ");
    cy.get(":nth-child(1) > :nth-child(3) > .MuiBox-root > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "CREATE_NEW_DESCRIPTION ");
  });

  it("MU-70 Edit category", () => {
    cy.contains(/MentroUS/)
      .as("mentroUs")
      .should("be.visible")
      .should("have.text", "MentroUS ");
    cy.get("@mentroUs").parents("td").siblings().last().as("moreBtn").should("be.visible");
    cy.get("@moreBtn").click();
    cy.get("#simple-menu > .MuiPaper-root").should("be.visible");
    cy.get('[tabindex="0"] > .MuiBox-root').should("be.visible").should("have.text", "editSửa");
    cy.get('[tabindex="0"] > .MuiBox-root > .MuiTypography-root').click();
    cy.get(".group-modal__container > .MuiTypography-h5")
      .should("have.text", "Chỉnh sửa loại nhóm")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(1) > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Tên loại nhóm (*)");
    cy.get(".css-1qoos23 > :nth-child(2) > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Mô tả");
    cy.get(".css-1qoos23 > :nth-child(3) > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Biểu tượng (*)");
    cy.get(":nth-child(4) > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", "Quyền ứng dụng");
    cy.get("#\\:r6\\:").should("have.value", "MentroUS").should("be.visible").should("be.enabled");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root")
      .should("have.text", "checkXác nhận")
      .should("be.enabled");
    cy.get(".css-13cnr6h-MuiButtonBase-root-MuiButton-root")
      .should("be.enabled")
      .should("have.text", "closeHủy");
    cy.get(":nth-child(3) > .MuiButtonBase-root")
      .should("have.text", "edit")
      .should("be.visible")
      .should("be.visible");
    cy.get(":nth-child(3) > .MuiAvatar-root > .MuiAvatar-img").should("be.visible");
    cy.get("#\\:r6\\:").clear();
    cy.get("#\\:r6\\:").type("NEW_NAME");
    cy.get("#\\:r7\\:").type("NEW_DESCRIPTION");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
    cy.contains("NEW_NAME ").as("editedCategory").should("have.text", "NEW_NAME ");
    cy.get(".MuiTableRow-root > :nth-child(2) > .MuiBox-root > .MuiTypography-root").should(
      "be.visible"
    );
    cy.contains(/^NEW_DESCRIPTION /).should("have.text", "NEW_DESCRIPTION ");
    cy.get("@editedCategory").parents("td").siblings().last().click();
    cy.get('[tabindex="0"] > .MuiBox-root > .MuiTypography-root').click();
    cy.get(".css-1qoos23").click();
    cy.get("#\\:rb\\:").clear();
    cy.get("#\\:rb\\:").type("MentroUS");
    cy.get("#\\:rc\\:").click();
    cy.get("#\\:rc\\:").clear();
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
    cy.contains(/MentroUS/)
      .as("mentroUs")
      .should("be.visible")
      .should("have.text", "MentroUS ");
  });

  const createCategory = (name, desc) => {
    cy.get(".css-j60lp5-MuiButtonBase-root-MuiButton-root").click();
    // Check popup modal
    cy.get(".group-modal__container > .MuiTypography-h5")
      .as("title")
      .should("have.text", "Thêm mới loại nhóm")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(1) > .MuiTypography-root")
      .should("have.text", "Tên loại nhóm (*)")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(2) > .MuiTypography-root")
      .should("have.text", "Mô tả")
      .should("be.visible");
    cy.get(".css-1qoos23 > :nth-child(3) > .MuiTypography-root")
      .should("have.text", "Biểu tượng (*)")
      .should("be.visible");
    cy.get(":nth-child(4) > .MuiTypography-root").should("have.text", "Quyền ứng dụng");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root")
      .as("confirmBtn")
      .should("be.visible")
      .should("be.enabled")
      .should("have.text", "checkXác nhận");
    cy.get(".css-13cnr6h-MuiButtonBase-root-MuiButton-root")
      .should("be.enabled")
      .should("be.visible")
      .should("have.text", "closeHủy");

    // Input data
    cy.get("#\\:r6\\:").clear();
    cy.get("#\\:r6\\:").type(name);
    cy.get("#\\:r7\\:").click();
    cy.get("#\\:r7\\:").clear();
    cy.get("#\\:r7\\:").type(desc);
    cy.get("#\\:r9\\:").click();
    cy.get("#\\:r9\\:-option-0 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get("#\\:r9\\:-option-1 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get("#\\:r9\\:-option-2 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get(":nth-child(4) > .MuiTypography-root").click();
    cy.get("span.MuiAutocomplete-tag").should("have.text", "+2");
    cy.get(".group-modal__container").click();
    cy.get(".MuiChip-label").should("have.text", "Quyền gửi file");

    cy.get("@confirmBtn").click();
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiBox-root > .MuiTypography-root"
    )
      .should("be.visible")
      .should("have.text", `${name} `);
    cy.get(":nth-child(1) > :nth-child(3) > .MuiBox-root > .MuiTypography-root")
      .should("be.visible")
      .should("have.text", `${desc} `);
  };

  it("MU-78 Delete a category and its relative groups", () => {
    createCategory("MU_78_Category1", "Desc1");
    cy.contains("MU_78_Category1").as("cat1");
    cy.get("@cat1").parents("td").siblings().last().as("moreBtn").click();
    cy.contains(/^xóa/i).should("be.visible").click();
    cy.get(":nth-child(1) > .delete-options__form-radio-input").check();
    cy.get(".group-modal__container > .MuiTypography-h5").should("have.text", "Xóa loại nhóm");
    cy.get(".group-modal__container > .MuiTypography-h5").should("be.visible");
    cy.get(".css-4ndtpb > :nth-child(1)").should(
      "have.text",
      "Xóa tất cả các nhóm thuộc loại nhóm hiện tại."
    );
    cy.get(":nth-child(1) > .delete-options__form-radio-input").should("be.checked");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root").should("be.enabled");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root").should("have.text", "checkXác nhận");
    cy.get(".css-uv3wtg-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
    cy.get(".swal2-confirm").click();
    cy.contains("MU_78_Category1").as("cat1").should("be.visible");
    cy.get("@cat1")
      .parents("td")
      .siblings()
      .contains("Đã xóa")
      .should("be.visible")
      .should("have.text", "Đã xóa ");
  });

  it("MU-79 Delete a category and move its group to another category", () => {
    createCategory("MU_79_Category1", "Desc1");
    cy.visit("/group-category");

    createCategory("MU_79_Category2", "Desc2");
    cy.contains("MU_79_Category1").as("cat1");
    cy.get("@cat1").parents("td").siblings().last().as("moreBtn").click();
    cy.contains(/^xóa/i).should("be.visible").click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".css-4ndtpb > :nth-child(2) > .MuiBox-root > .MuiTypography-root").should(
      "have.text",
      "Trước khi xóa, Chuyển tất cả các nhóm thuộc loại nhóm này sang loại nhóm khác:"
    );
    cy.get(".css-4ndtpb > :nth-child(2) > .MuiBox-root > .MuiTypography-root").should("be.visible");
    cy.get(":nth-child(2) > .delete-options__form-radio-input").check();
    cy.get(
      '.css-4ndtpb > :nth-child(2) > .MuiBox-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();
    cy.get("li").contains("MU_79_Category2").click();
    cy.contains(/xác nhận/i).click();
    cy.contains(/đồng ý/i).click();
    cy.get("@cat1")
      .parents("td")
      .siblings()
      .contains(/đã xóa/i)
      .should("be.visible");
  });

  it("MU-99 Export categories to Excel", () => {
    cy.intercept("/api/group-categories/export*").as("exportFile");
    cy.listFileDownloaded().then((before) => {
      cy.get(".css-k1rhy8-MuiButtonBase-root-MuiButton-root > .MuiTypography-root").click();
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
