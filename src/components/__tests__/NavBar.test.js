import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

test("Test navbar links for logged-out users", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const brandLogo = screen.getByAltText("Logo");
  const loginLink = screen.getByText("Login");
  const signUpLink = screen.getByText("Sign Up");
  const ourBlogLink = screen.getByText("Our Blog");

  expect(brandLogo).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
  expect(ourBlogLink).toBeInTheDocument();
});
