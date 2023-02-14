import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPropertyIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <i className="far fa-plus-square"></i>Add property
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/feed"
        >
          <i className="fas fa-stream"></i>Feed
        </NavLink>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/saved"
        >
          <i class="fa-solid fa-bookmark"></i>Saved
        </NavLink>
        <NavLink className={styles.NavLink} to="/" onClick={handleLogOut}>
          <i className="fas fa-sign-out-alt"></i>Logout
        </NavLink>
      </>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="login"
      >
        <i className="fas fa-sign-in-alt"></i>Login
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="signup"
      >
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand className={styles.Logo} to="/">
            <img src={logo} alt="Logo" height="80" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPropertyIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
