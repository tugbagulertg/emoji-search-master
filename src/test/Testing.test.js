import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("header-render", () => {
  let headerRender, emojiList, input, copyControl;
  beforeEach(() => {
    render(<App />);
  });

  test("Document should be have HeaderComponent", () => {
    headerRender = screen.getByText("Emoji Search");
    expect(headerRender).toBeInTheDocument();
  });

  test("emojiList should be rendered successfully", () => {
    emojiList = screen.getAllByText("Click to copy emoji");
    expect(emojiList).toHaveLength(20);
  });
  test("When filtering, the emojiList should be re-rendered to match the filtering.", () => {
    input = screen.getByPlaceholderText("filteringTest");
    userEvent.type(input, "wink");
    let item = screen.getByText("Wink");
    expect(item).toBeInTheDocument();
  });
  test("When any emoji is clicked on the list, the clicked emoji needs to be copied.", () => {
    copyControl = screen.getByText("Grimacing");
    userEvent.click(copyControl);
    expect(
      copyControl.parentElement.getAttribute("data-clipboard-text")
    ).toMatch("😬");
  });
});
