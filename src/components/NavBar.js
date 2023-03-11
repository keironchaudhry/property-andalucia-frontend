import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import axios from "axios";

import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";
import Avatar from "./Avatar";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import useUntoggle from "../hooks/useUntoggle";
import { removeTokenTimestamp } from "../utils/utils";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useUntoggle();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
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
        <i className="fa-solid fa-bookmark"></i>Saved
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleLogOut}>
        <i className="fas fa-sign-out-alt"></i>Logout
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={35}
        />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fas fa-sign-in-alt"></i>Login
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand className={styles.Logo} to="/">
            <img src={logo} alt="Logo" height="80" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            {currentUser?.seller_status && addPropertyIcon}
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
