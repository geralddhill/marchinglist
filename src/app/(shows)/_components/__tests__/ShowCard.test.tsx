import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import ShowCard from "@/app/(shows)/_components/ShowCard";

describe("ShowCard", () => {
  const show = {
    id: 1,
    title: "Test Title",
    price: 1200,
    duration: 300,
    thumbnailUrl: "./test_show.jpg",
    owner: {
      id: "1",
      name: "Test Owner",
      username: "testowner",
      image: "./default_avatar.png"
    }
  }

  it("Renders card as article", () => {
    render(<ShowCard show={show}/>);

    expect(screen.getByRole("article")).toBeInTheDocument();
  })

  it("Renders correct heading with link inside", () => {
    render(<ShowCard show={show} />);

    // TODO: Adjust level when heading level is decided
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveAccessibleName("Test Title");
    // TODO: Fill out with correct href once page structure is decided
    expect(heading).toBeInTheDocument();
    // expect(within(heading).getByRole("link")).toHaveAttribute("href", "/");
  });

  it("Renders price with a machine-readable value", ()=> {
    render(<ShowCard show={show}/>);

    const price = screen.getByText("$1,200");
    expect(price).toHaveAttribute("value", "1200");
  })

  it("Renders duration with correct ISO duration", ()=> {
    render(<ShowCard show={show}/>);

    const duration = screen.getByText("5:00");
    expect(duration).toHaveAttribute("datetime", "PT0H5M0S");
  })

  it("Renders thumbnail with descriptive alt text", () => {
    render(<ShowCard show={show}/>);

    const img = screen.getByRole('img')
    expect(img).toHaveAccessibleName("Thumbnail for Test Title");
  })

  it("Image has correct source", () => {
    render(<ShowCard show={show} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("./test_show.jpg")),
    );
  })

  it("Has no detectable accessibility violations", async () => {
    const { container } = render(<ShowCard show={show} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
