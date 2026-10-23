import { render, screen } from "@testing-library/react";
import UserProfileLink from "@/features/users/components/user-profile-link";
import { axe } from "jest-axe";

const user = {
  name: "John Doe",
  username: "johndoe",
  image: null
}

describe("UserProfileLink", () => {
  it("Renders as a link with correct href", () => {
    render(<UserProfileLink user={user}/>)
    expect(screen.getByRole("link")).toHaveAttribute("href", "/profile/johndoe");
  })

  it("Has no detectable accessibility violations", async () => {
    const { container } = render(<UserProfileLink user={user}/>);
    expect(await axe(container)).toHaveNoViolations();
  });
})