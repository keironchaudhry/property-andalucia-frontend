import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfilePage.module.css";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    userBio: "",
    emailAddress: "",
    phoneNum: "",
    image: "",
  });
  const { name, userBio, emailAddress, phoneNum, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, bio, email, telephone, image } = data;
          setProfileData({
            name,
            userBio: bio,
            emailAddress: email,
            phoneNum: telephone,
            image,
          });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", userBio);
    formData.append("email", emailAddress);
    formData.append("telephone", phoneNum);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      {/* Email address form */}
      <Form.Group controlId="emailAddress">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="emailAddress"
          value={emailAddress}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Phone number form */}
      <Form.Group controlId="phoneNum">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="number"
          name="phoneNum"
          value={phoneNum}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.telephone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Bio form */}
      <Form.Group controlId="userBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={userBio}
          onChange={handleChange}
          name="userBio"
          rows={7}
        />
      </Form.Group>
      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Submit/cancel buttons */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        type="submit"
      >
        Save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className={`${styles.Profile} mt-3`}>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className="mt-5">
            {/* If image exists, then show image and show edit file */}
            <Form.Group>
              {image && (
                <figure>
                  <Image
                    className={appStyles.Image}
                    src={image}
                    fluid
                    rounded
                  />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Bright} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              {/* Change image form */}
              <Form.File
                className="d-none"
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col
          md={5}
          lg={6}
          className="d-none d-md-block p-0 p-md-2 text-center mt-2 mb-3"
        >
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
