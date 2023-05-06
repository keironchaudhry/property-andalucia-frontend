import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

test('Renders the "login" link on Navbar component', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const loginLink = screen.getByText("Login");

  expect(loginLink).toBeInTheDocument();
});
