import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={8} lg={6}>
        <Container className={`mt-5 ${appStyles.Content}`}>
          <h1 className={styles.Header}>Sign Up</h1>

          <Container className={`mt-3 mb-3 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/signin">
              Already have an account? <span>Sign in here.</span>
            </Link>
          </Container>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter a username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Enter a password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Confirm your password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm your password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="checkbox">
              <Form.Check
                type="checkbox"
                label="I am selling property"
                name="seller_status"
              />
            </Form.Group>

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
