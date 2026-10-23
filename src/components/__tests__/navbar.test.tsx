import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar/navbar";
import {axe} from "jest-axe";
import { mockUsePathname } from "@/test-utils/navigation";
import NavHeader from "@/components/navbar/nav-header";
import AddButton from "@/components/navbar/add-button";

jest.mock("next/dist/client/components/navigation");

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: jest.fn()
  }
}))
// const mockUseSession = jest.mocked(authClient.useSession)

beforeEach(() => {
  mockUsePathname.mockReturnValue("/");

});

describe("NavHeader", () => {
  it("Renders logo as h1 if on home page", () => {
    render(<NavHeader />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("MarchingList");
  });

  it("Does not render logo as h1 if not on home page", () => {
    mockUsePathname.mockReturnValue("/not-home");
    render(<NavHeader />);

    const heading = screen.queryByRole("heading", { level: 1 });

    expect(heading).toBeNull();
  });

  it("Logo links home with an accessible name", () => {
    render(<NavHeader />);

    expect(
      screen.getByRole("link", { name: /MarchingList home/i }),
    ).toHaveAttribute("href", "/");
  });

  it("Has no detectable accessibility violations", async () => {
    const { container } = render(<NavHeader />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AddButton", () => {
  it("Renders as a link", () => {
    render(<AddButton/>)
    expect(screen.getByRole("link", { name: /new show/i })).toBeInTheDocument();
  })

  it("Has no detectable accessibility violations", async () => {
    const { container } = render(<AddButton />);
    expect(await axe(container)).toHaveNoViolations();
  });
})

describe("Navbar", () => {
  it("Has no detectable accessibility violations", async () => {
    const { container } = render(<Navbar />);
    expect(await axe(container)).toHaveNoViolations();
  });
})