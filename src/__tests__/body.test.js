describe("Body Element Tests", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("should render body element", () => {
    expect(document.body).toBeTruthy();
    expect(document.body.tagName).toBe("BODY");
  });

  test("should allow adding content to body", () => {
    const testDiv = document.createElement("div");
    testDiv.id = "test-content";
    testDiv.textContent = "Hello, World!";

    document.body.appendChild(testDiv);

    const addedElement = document.body.querySelector("#test-content");
    expect(addedElement).toBeTruthy();
    expect(addedElement.textContent).toBe("Hello, World!");
  });

  test("should have empty body initially", () => {
    expect(document.body.children.length).toBe(0);
    expect(document.body.innerHTML).toBe("");
  });
});
