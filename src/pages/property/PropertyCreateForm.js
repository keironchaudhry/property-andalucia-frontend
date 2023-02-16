import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import Asset from "../../components/Asset";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/PropertyCreateEditForm.module.css";
import Upload from "../../assets/upload.png";

export default function PropertyCreateForm() {
  const history = useHistory();

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label>Placeholder one</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="title">
        <Form.Label>Placeholder two</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="title">
        <Form.Label>Placeholder three</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
    </div>
  );

  const buttons = (
    <>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Orange} me-3`}
        type="submit"
      >
        Create
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Orange}`}
        onClick={() => {
          history.goBack();
        }}
      >
        Cancel
      </Button>
    </>
  );

  return (
    <Container
      className={`${styles.FormContainer} mt-5 p-0 text-center rounded`}
    >
      <Form>
        <Row className="d-flex flex-column flex-md-row mx-3 my-3 gap-3">
          {/* Image */}
          <Col className="py-2 p-1 p-md-2" md={6} lg={6}>
            <Container
              className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0`}
            >
              <Form.Label
                className="d-flex flex-column justify-content-center"
                htmlFor="image-upload"
              >
                <Asset src={Upload} message="Upload an image of your property" />
              </Form.Label>
            </Container>
          </Col>

          {/* Input Fields */}
          <Col className="p-2">
            <Container className="border border-2 p-2 rounded">
              {textFields}
            </Container>
          </Col>
        </Row>

        {/* Buttons */}
        <Container className="my-4">{buttons}</Container>
      </Form>
    </Container>
  );
}
