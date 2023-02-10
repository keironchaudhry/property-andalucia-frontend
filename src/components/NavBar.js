import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand className={styles.Logo}>
          <img src={logo} alt="Logo" height="80" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link className={styles.NavLink}>
              <i className="fas fa-home"></i>Home
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <i className="fas fa-sign-in-alt"></i>Login
            </Nav.Link>
            <Nav.Link className={styles.NavLink}>
              <i className="fas fa-user-plus"></i>Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
