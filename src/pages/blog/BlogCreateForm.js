import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/PropertyCreateEditForm.module.css";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

export default function BlogCreateForm() {
  useRedirect("notStaff");
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = blogData;

  const imageInput = useRef(null);

  const history = useHistory();

  const handleChange = (event) => {
    setBlogData({
      ...blogData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setBlogData({
        ...blogData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/blog/create/", formData);
      history.push(`/blog/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const titleField = (
    <div className="text-center">
      {/* Blog Title */}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
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

  const contentField = (
    <div className="text-center">
      {/* Blog Content Form */}
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={8}
          type="text"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  const imageField = (
    <Container
      className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0`}
    >
      {/* When image is uploaded : show image + "change image" button */}
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
          <Asset src={Upload} message="Upload an image for your blog post" />
        </Form.Label>
      )}
      {/* Image form */}
      <Form.Control
        className="d-none"
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleChangeImage}
        ref={imageInput}
      />
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </Container>
  );

  const buttons = (
    <>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright} mr-1`}
        type="submit"
      >
        Create
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright} ml-1`}
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
      className={`${styles.FormContainer} mt-3 p-0 text-center rounded`}
    >
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex flex-column flex-md-row mx-3 my-3 gap-3">
          <Col className="py-2 p-1 p-md-2" md={6} lg={6}>
            <Container className="border-2 p-2 rounded">
              {/* Title */}
              {titleField}

              {/* Content */}
              {contentField}
            </Container>
          </Col>

          <Col className="py-2 p-1 p-md-2" md={6} lg={6}>
            {/* Image */}
            {imageField}
          </Col>
        </Row>

        {/* Buttons */}
        <Container className="my-3">{buttons}</Container>
      </Form>
    </Container>
  );
}
