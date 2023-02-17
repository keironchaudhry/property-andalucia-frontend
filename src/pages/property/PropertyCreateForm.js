import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/PropertyCreateEditForm.module.css";
import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

export default function PropertyCreateForm() {
  const [errors, setErrors] = useState({});

  const [propertyData, setPropertyData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const { name, description, image } = propertyData;

  const imageInput = useRef(null);

  const history = useHistory();

  const handleChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPropertyData({
        ...propertyData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/property/create/", formData);
      history.push(`/property/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="name">
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex flex-column flex-md-row mx-3 my-3 gap-3">
          {/* Image */}
          <Col className="py-2 p-1 p-md-2" md={6} lg={6}>
            <Container
              className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0`}
            >
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                      htmlFor="image-upload"
                    >
                      Change image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex flex-column justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Upload an image of your property"
                  />
                </Form.Label>
              )}
              <Form.Control
                className="d-none"
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
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
