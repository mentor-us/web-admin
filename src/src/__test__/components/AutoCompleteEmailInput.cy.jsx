import AutoCompleteEmailInput from "components/AutoComplete/AutoCompleteEmailInput";

describe("<AutoCompleteEmailInput />", () => {
  it("should render AutoCompleteEmailInput element", () => {
    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        value={[]}
        onChange={() => {}}
        data={[]}
      />
    );
    cy.get("input")
      .should("be.visible")
      .should("be.enabled")
      .should("have.value", "")
      .should("have.attr", "placeholder", "AutoCompleteEmailInput");
  });

  it("should show one value and no remaining selected count", () => {
    const data = ["Item 1", "Item 2"];
    const value = [data[0]];
    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        onChange={() => {}}
        data={data}
        value={value}
      />
    );

    cy.contains("Item 1").should("be.visible").should("have.length", 1);
    cy.contains("Item 2").should("not.exist");
    cy.contains(`+${data.length - 1}`).should("not.exist");
  });

  it("should show value and remaining selected count", () => {
    const data = [];
    for (let i = 1; i < 10; i += 1) {
      data.push(`Item ${i}`);
    }
    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        onChange={() => {}}
        data={data}
        value={data}
      />
    );

    cy.contains("Item 1").should("be.visible").should("have.length", 1);
    cy.contains("Item 2").should("not.exist");
    cy.contains(`+${data.length - 1}`).should("be.visible");
  });

  it('should show "+ Thêm ..." when no option found', () => {
    const data = ["Item 1", "Item 2"];
    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        onChange={() => {}}
        data={data}
        value={[]}
      />
    );
    cy.get("input").type("Item 3");
    cy.contains(/\+ Thêm Item 3/i).should("be.visible");
  });

  it("should call onChange only one when change value", () => {
    const data = ["test1@gmail.com", "test2@gmail.com"];
    const onChange = cy.stub().as("onChange");
    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        onChange={onChange}
        data={data}
        value={[]}
      />
    );

    cy.get("input").type("test1@gmail.com");
    cy.contains(/test1@gmail.com/i)
      .should("be.visible")
      .click();
    cy.get("@onChange").should("have.been.calledOnce").should("have.been.calledWith", [data[0]]);
  });

  it("should Clear Button clear value", () => {
    const data = ["test1@gmail.com", "test2@gmail.com"];
    const onChange = cy.stub().as("onChange");

    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        onChange={onChange}
        data={data}
        value={[data[0]]}
      />
    );
    cy.get("input").click();
    cy.get("button[title='Clear']").should("be.enabled").click();
    cy.get("@onChange").should("have.been.calledOnce").should("have.been.calledWith", []);
  });

  it("should remove value when click on selected item", () => {
    const data = ["test1@gmail.com", "test2@gmail.com"];
    const onChange = cy.stub().as("onChange");
    cy.mount(
      <AutoCompleteEmailInput
        placeholder="AutoCompleteEmailInput"
        onChange={onChange}
        data={data}
        value={data}
      />
    );
    cy.get("input").click();
    cy.contains("test1@gmail.com").should("be.visible").next("svg").click();
    cy.get("@onChange").should("have.been.calledWith", [data[1]]);

    cy.contains("test2@gmail.com").should("be.visible").next("svg").click();
    cy.get("@onChange").should("have.been.calledWith", [data[0]]).should("have.been.calledTwice");
  });
});
