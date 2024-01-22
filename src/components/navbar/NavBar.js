import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import Avatar from "../avatar/Avatar.js";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext.js";
import useUntoggle from "../../hooks/useUntoggle.js";
import { removeTokenTimestamp } from "../../utils/utils.js";

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

  const addBlogPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/blog/create"
    >
      <i class="fa-solid fa-pen-to-square"></i>Create post
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
          height={30}
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
      expand="lg"
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
            {currentUser?.is_staff && addBlogPostIcon}
            {currentUser?.seller_status && addPropertyIcon}
            {currentUser ? loggedInIcons : loggedOutIcons}
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/blog"
            >
              <i class="fa-regular fa-comment"></i>Our Blog
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
