import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

test("Page renders when searched-for page is nonexistent", () => {
  render(<NotFound />);

  const notFoundIcon = screen.getByRole("div");

  expect(notFoundIcon).toBeInTheDocument();
});
