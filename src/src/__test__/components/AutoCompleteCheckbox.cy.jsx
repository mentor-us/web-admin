import AutoCompleteCheckbox from "components/AutoComplete/AutoCompleteCheckbox";

describe("<AutoCompleteCheckbox />", () => {
  it("should render AutoCompleteCheckbox element", () => {
    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={() => {}}
        options={[]}
        value={[]}
      />
    );
    cy.get("input")
      .should("be.visible")
      .should("be.enabled")
      .should("have.value", "")
      .should("have.attr", "placeholder", "AutoCompleteCheckbox");
  });

  it("should show one value and no remaining selected count", () => {
    const options = [{ description: "Item 1" }, { description: "Item 2" }];
    const value = [options[0]];
    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={() => {}}
        options={options}
        value={value}
      />
    );
    cy.contains("Item 1").should("be.visible").should("have.length", 1);
    cy.contains("Item 2").should("not.exist");
    cy.contains(`+${options.length - 1}`).should("not.exist");
  });

  it("should show value and remaining selected count", () => {
    const options = [];
    for (let i = 1; i < 10; i += 1) {
      options.push({ description: `Item ${i}` });
    }
    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={() => {}}
        options={options}
        value={options}
      />
    );
    cy.contains("Item 1").should("be.visible").should("have.length", 1);
    cy.contains("Item 2").should("not.exist");
    cy.contains(`+${options.length - 1}`).should("be.visible");
  });

  it('should show "Trống" when no option found', () => {
    const options = [{ description: "Item 1" }, { description: "Item 2" }];
    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={() => {}}
        options={options}
        value={[]}
      />
    );
    cy.get("input").type("Item 3");
    cy.contains("Trống").should("be.visible");
  });

  it("should call onChange only 1 when change value", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    const options = [{ description: "Item 1" }, { description: "Item 2" }];
    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={onChangeSpy}
        options={options}
        value={[]}
      />
    );
    cy.get("input").type("Item 1");
    cy.contains("Item 1").click();
    cy.get("@onChangeSpy")
      .should("have.been.calledOnce")
      .should("have.been.calledWith", [options[0]]);
  });

  it("should Clear Button clear value", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    const options = [{ description: "Item 1" }, { description: "Item 2" }];

    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={onChangeSpy}
        options={options}
        value={options}
      />
    );
    cy.get("input").click();
    cy.get("button[title='Clear']").should("be.enabled").click();
    cy.get("@onChangeSpy").should("have.been.calledOnce").should("have.been.calledWith", []);
  });

  it("should remove value when click on selected item", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    const options = [{ description: "Item 1" }, { description: "Item 2" }];
    cy.mount(
      <AutoCompleteCheckbox
        placeholder="AutoCompleteCheckbox"
        onChange={onChangeSpy}
        options={options}
        value={options}
      />
    );
    cy.get("input").click();
    cy.contains("Item 2").should("be.visible").next("svg").click();
    cy.get("@onChangeSpy").should("have.been.calledWith", [options[0]]);

    cy.contains("Item 1").should("be.visible").next("svg").click();
    cy.get("@onChangeSpy")
      .should("have.been.calledWith", [options[1]])
      .should("have.been.calledTwice");
  });
});
