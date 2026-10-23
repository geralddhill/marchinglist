import { render, screen } from "@testing-library/react";
import ShowList from "@/features/shows/components/show-list";


describe("ShowsSection", () => {
  it("Renders shows as lists", async () => {
    const shows = [
      {
        title: "Show 1",
        price: 1200,
        duration: 300,
        thumbnailUrl: "",
        description: "",
        difficulty: "beginning" as "beginning",
        slug: "show-1",
        owner: {
          name: "Test Owner",
          username: "testowner",
          image: "./default_avatar.png",
        },
      },
      {
        title: "Show 2",
        price: 1350,
        duration: 400,
        thumbnailUrl: "",
        description: "",
        difficulty: "intermediate" as "intermediate",
        slug: "show-2",
        owner: {
          name: "Test Owner 2",
          username: "testowner2",
          image: "./default_avatar.png",
        },
      },
      {
        title: "Show 3",
        price: 1100,
        duration: 320,
        thumbnailUrl: "",
        description: "",
        difficulty: "advanced" as "advanced",
        slug: "show-3",
        owner: {
          name: "Test Owner",
          username: "testowner",
          image: "./default_avatar.png",
        },
      },
    ];

    render(<ShowList shows={shows} noShowsDesc={""} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  })

  it("Renders paragraph when shows list is empty", async () => {
    render(<ShowList shows={[]} noShowsDesc={""} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  })
})