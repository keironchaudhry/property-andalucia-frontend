import { render, screen } from "@testing-library/react";
import Avatar from "../avatar/Avatar";

test("Avatar image renders when source prop is true", () => {
  render(<Avatar src={true} />);

  const avatarImg = screen.getByAltText("Avatar");

  expect(avatarImg).toBeInTheDocument();
});
