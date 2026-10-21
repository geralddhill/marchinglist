import userEvent from "@testing-library/user-event/dist/cjs/index.js";
import { render, screen } from "@testing-library/react";
import UserNavButton from "@/components/Navbar/UserNavButton";
import { axe } from "jest-axe";

const props = {
  user: {
    username: "test",
    image: "default_avatar.png",
  },
  handleSignOut: jest.fn(),
}

describe("UserNavButton", () => {
  it("Clicking sign out calls handleSignOut", async () => {
    const user = userEvent.setup()
    render(<UserNavButton {...props} />);

    await user.click(screen.getByRole("button", { name: /user menu/i}));
    await user.click(screen.getByRole("menuitem", { name: /sign out/i}));
    expect(props.handleSignOut).toHaveBeenCalledTimes(1);
  })

  it("Menu toggle button expands and collapses menu", async () => {
    const user = userEvent.setup({pointerEventsCheck: 0});
    render(<UserNavButton {...props} />);

    const button = screen.getByRole("button", { name: /user menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("Renders menu items correctly", async () => {
    const user = userEvent.setup()
    render(<UserNavButton {...props} />);

    await user.click(screen.getByRole("button", { name: /user menu/i }));
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  });


  it("Menu toggle button controls an element that exists", async () => {
    const user = userEvent.setup()
    render(<UserNavButton {...props} />);

    const button = screen.getByRole("button", { name: /user menu/i })
    const controlledId = button.getAttribute("aria-controls");
    if (controlledId === null) {
      throw new Error("Button is missing attribute aria-controls.");
    }

    await user.click(button);
    expect(document.getElementById(controlledId)).toBeInTheDocument();
  });

  it("Menu toggle button works with keyboard", async () => {
    const user = userEvent.setup();
    render(<UserNavButton {...props} />);

    const button = screen.getByRole("button", { name: /user menu/i });
    button.focus();
    await user.keyboard("{Enter}");

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("Has no detectable accessibility violations", async () => {
    const { container } = render(<UserNavButton {...props} />);
    expect(await axe(container)).toHaveNoViolations();
  });
})