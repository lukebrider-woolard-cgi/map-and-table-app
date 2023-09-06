import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { IconButtonGroup, Props } from "./IconButtonGroup";
import { ButtonProps } from "../../types";

import { TbAlpha, TbBeta, TbDelta } from "react-icons/tb";

const testButtons: ButtonProps[] = [
  { label: "Alpha", icon: TbAlpha },
  { label: "Beta", icon: TbBeta },
  { label: "Delta", icon: TbDelta },
];

const testProps: Props = {
  groupName: "Tests",
  buttons: testButtons,
  passSelectedTool: vi.fn(),
};

describe("Icon Button Group Tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("button group renders text and expected buttons", () => {
    render(<IconButtonGroup {...testProps} />);

    const renderedButtons = screen.getAllByRole("button");
    expect(screen.getByText(/tests:/i)).toBeInTheDocument();

    expect(renderedButtons.length).toBe(3);

    renderedButtons.forEach((button, index) => {
      expect(button.title).toBe(testButtons[index].label);
    });
  });

  test("button is active if default set", () => {
    const propsWithDefault: Props = { ...testProps, defaultSelected: "Beta" };
    render(<IconButtonGroup {...propsWithDefault} />);

    expect(screen.getByRole("button", { name: /alpha/i })).toHaveClass(
      "tool-button"
    );
    expect(screen.getByRole("button", { name: /beta/i })).toHaveClass(
      "tool-button active"
    );
    expect(screen.getByRole("button", { name: /delta/i })).toHaveClass(
      "tool-button"
    );
  });

  test("clicked button passes expected value to callback", async () => {
    const mockPassFunction = vi.fn().mockName("pass button name");
    const propsWithMockedPass: Props = {
      ...testProps,
      passSelectedTool: mockPassFunction,
    };
    render(<IconButtonGroup {...propsWithMockedPass} />);

    const firstButton = screen.getByRole("button", { name: /alpha/i });
    await userEvent.click(firstButton);

    expect(mockPassFunction).toHaveBeenCalledWith("Alpha");

    const secondButton = screen.getByRole("button", { name: /beta/i });
    await userEvent.click(secondButton);

    expect(mockPassFunction).toHaveBeenCalledWith("Beta");

    const thirdButton = screen.getByRole("button", { name: /delta/i });
    await userEvent.click(thirdButton);

    expect(mockPassFunction).toHaveBeenCalledWith("Delta");
  });
});
