import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import {axe} from "jest-axe";
import { mockUsePathname } from "@/test-utils/navigation";
import { authClient } from "@/lib/auth-client";

jest.mock("next/dist/client/components/navigation");

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: jest.fn()
  }
}))
const mockUseSession = jest.mocked(authClient.useSession)

beforeEach(() => {
  mockUsePathname.mockReturnValue("/");
  mockUseSession.mockReturnValue({
    data: null,
    error: null,
    isPending: false,
    isRefetching: false,
    refetch: jest.fn()
  })
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Navbar", () => {
  describe("Logo header", () => {
    it("Renders logo as h1 if on home page", () => {
      render(<Navbar />);

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("MarchingList");
    });

    it("Does not render logo as h1 if not on home page", () => {
      mockUsePathname.mockReturnValue("/not-home");
      render(<Navbar />);

      const heading = screen.queryByRole("heading", { level: 1 });

      expect(heading).toBeNull();
    });

    it("Logo links home with an accessible name", () => {
      render(<Navbar />);

      expect(
        screen.getByRole("link", { name: /MarchingList home/i }),
      ).toHaveAttribute("href", "/");
    });
  })

  describe("Structure and Links", () => {
    it("Renders a labeled navigation bar with correct links", () => {
      render(<Navbar />);

      const nav = screen.getByRole("navigation", {name: /main/i});

      expect(nav).toBeInTheDocument();

      // TODO: Add links as navigation links are decided
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/",
      );
      expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute(
        "href",
        "/sign-in",
      );
    });

    it("Renders navigation links as list items", () => {
      render(<Navbar />);
      // TODO: Update length when navigation links are decided
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });

    it("Links are reachable with the keyboard in order", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      // Skips logo, mobile sign in/user buttons, and menu toggle
      await user.tab();
      await user.tab();
      await user.tab();

      await user.tab();
      expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();

      // TODO: Check for all navigation links once they are decided
      await user.tab();
      await user.tab();
      await user.tab();

      await user.tab();
      expect(screen.getByRole("link", { name: "Sign In" })).toHaveFocus();
    });
  })

  // TODO: Add tests for current page state once pages are decided

  describe("Mobile menu", () => {
    it("Menu toggle button expands and collapses menu", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const button = screen.getByRole("button", { name: /menu/i });
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      await user.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("Menu toggle button controls an element that exists", () => {
      render(<Navbar />);

      const controlledId = screen
        .getByRole("button", { name: /menu/i })
        .getAttribute("aria-controls");
      if (controlledId === null) {
        throw new Error("Button is missing attribute aria-controls.");
      }
      expect(document.getElementById(controlledId)).toBeInTheDocument();
    });

    it("Clicking a link closes the mobile menu", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const button = screen.getByRole("button", { name: /menu/i });
      await user.click(button);

      const link = screen.getByRole("link", { name: "Sign In" });
      // Prevents link from trying to navigate, since jsdom does not implement navigation
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
      await user.click(link);

      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("Menu toggle button works with keyboard", async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const button = screen.getByRole("button", { name: /menu/i });
      button.focus();
      await user.keyboard("{Enter}");

      expect(button).toHaveAttribute("aria-expanded", "true");
    });
  })

  describe("Accessibility", () => {
    it("Has no detectable accessibility violations", async () => {
      const { container } = render(<Navbar />);
      expect(await axe(container)).toHaveNoViolations();
    });
  })
});
