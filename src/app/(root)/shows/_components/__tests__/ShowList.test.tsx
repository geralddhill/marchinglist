import { getShows } from "@/data/shows/queries";
import ShowList from "@/app/(root)/shows/_components/ShowList";
import { render, screen } from "@testing-library/react";

jest.mock("@/data/shows/queries", () => ({
  getShows: jest.fn(),
}));
const mockedGetShows = jest.mocked(getShows);

describe("ShowList", () => {
  it("Renders shows as lists", async () => {
    mockedGetShows.mockResolvedValue([
      {
        title: "Show 1",
        price: 1200,
        duration: 300,
        thumbnailUrl: "",
        description: "",
        difficulty: "beginning",
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
        difficulty: "intermediate",
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
        difficulty: "advanced",
        slug: "show-3",
        owner: {
          name: "Test Owner",
          username: "testowner",
          image: "./default_avatar.png",
        },
      },
    ]);

    render(await ShowList());

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  })

  it("Renders paragraph when shows list is empty", async () => {
    mockedGetShows.mockResolvedValue([])

    render(await ShowList());

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  })
})