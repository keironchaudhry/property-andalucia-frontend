import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

test("Brand logo renders on Navbar component", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const brandLogo = screen.getByAltText("Logo");

  expect(brandLogo).toBeInTheDocument();
});

test('Renders the "login" link on Navbar component', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const loginLink = screen.getByText("Login");

  expect(loginLink).toBeInTheDocument();
});

test('Renders the "sign up" link', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signUpLink = screen.getByText("Sign Up");

  expect(signUpLink).toBeInTheDocument();
});

test('Renders the "Our Blog" link', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const ourBlogLink = screen.getByText("Our Blog");

  expect(ourBlogLink).toBeInTheDocument();
});
