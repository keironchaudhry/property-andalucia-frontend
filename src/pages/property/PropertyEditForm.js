import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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

export default function PropertyEditForm() {
  const [errors, setErrors] = useState({});

  const [propertyData, setPropertyData] = useState({
    name: "",
    propertyType: "apartment",
    province: "malaga",
    municipality: "",
    street: "",
    postCode: "",
    price: 0,
    size: 0,
    bedrooms: "",
    bathrooms: "",
    garage: false,
    garden: false,
    isSouthFacing: false,
    sold: false,
    description: "",
    image: "",
    longitude: 0,
    latitude: 0,
  });

  const {
    name,
    propertyType,
    province,
    municipality,
    street,
    postCode,
    price,
    size,
    bedrooms,
    bathrooms,
    garage,
    garden,
    isSouthFacing,
    sold,
    description,
    image,
    longitude,
    latitude,
  } = propertyData;

  const imageInput = useRef(null);

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/property/${id}/`);
        const {
          is_owner,
          name,
          property_type,
          province,
          municipality,
          street,
          post_code,
          price,
          size,
          bedroom_count,
          bathrooms_count,
          garage,
          garden,
          is_south_facing,
          sold,
          description,
          image,
          longitude,
          latitude,
        } = data;

        is_owner
          ? setPropertyData({
              name,
              propertyType: property_type,
              province,
              municipality,
              street,
              postCode: post_code,
              price,
              size,
              bedrooms: bedroom_count,
              bathrooms: bathrooms_count,
              garage,
              garden,
              isSouthFacing: is_south_facing,
              sold,
              description,
              image,
              longitude,
              latitude,
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckBox = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.checked,
    });
    console.log(event.target.name, event.target.checked);
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
    formData.append("property_type", propertyType);
    formData.append("province", province);
    formData.append("municipality", municipality);
    formData.append("street", street);
    formData.append("post_code", postCode);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("bedroom_count", bedrooms);
    formData.append("bathrooms_count", bathrooms);
    formData.append("garage", garage);
    formData.append("garden", garden);
    formData.append("is_south_facing", isSouthFacing);
    formData.append("sold", sold);
    formData.append("description", description);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/property/${id}/`, formData);
      history.push(`/property/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const mainFields = (
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
      {errors?.name?.map((message, idx) => (
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
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  const googleMapFields = (
    <div className="text-center">
      <Form.Group controlId="longitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          step="1.00"
          type="number"
          name="longitude"
          value={longitude}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="latitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          step="1.00"
          type="number"
          name="latitude"
          value={latitude}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );

  const imageFields = (
    <Container
      className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0 mt-3`}
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
          <Asset src={Upload} message="Upload an image of your property" />
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
  );

  const extraFields = (
    <div className="text-center">
      <Form.Group controlId="propertyType">
        <Form.Label>Property Type</Form.Label>
        <Form.Control
          as="select"
          name="propertyType"
          value={propertyType}
          onChange={handleChange}
        >
          <option value="apartment">Apartment</option>
          <option value="flat">Flat</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
          <option value="residential housing estate">
            Residential Housing Estate
          </option>
          <option value="country property">Country Property</option>
          <option value="bungalow">Bungalow</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="province">
        <Form.Label>Province</Form.Label>
        <Form.Control
          as="select"
          name="province"
          value={province}
          onChange={handleChange}
        >
          <option value="huelva">Huelva</option>
          <option value="sevilla">Sevilla</option>
          <option value="cadiz">Cadiz</option>
          <option value="cordoba">Cordoba</option>
          <option value="granada">Granada</option>
          <option value="malaga">Malaga</option>
          <option value="jaen">Jaen</option>
          <option value="almeria">Almeria</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="municipality">
        <Form.Label>Municipality</Form.Label>
        <Form.Control
          type="text"
          name="municipality"
          value={municipality}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.municipality?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="street">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={street}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.street?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="postCode">
        <Form.Label>Postcode</Form.Label>
        <Form.Control
          type="text"
          name="postCode"
          value={postCode}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.postcode?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="price">
        <Form.Label>Price (€)</Form.Label>
        <Form.Control
          min="0"
          step="1.00"
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="size">
        <Form.Label>Size (m²)</Form.Label>
        <Form.Control
          min="0"
          step="1"
          type="number"
          name="size"
          value={size}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.size?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="bedrooms">
        <Form.Label>Bedrooms</Form.Label>
        <Form.Control
          min="0"
          step="1"
          type="number"
          name="bedrooms"
          value={bedrooms}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.bedrooms?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="bathrooms">
        <Form.Label>Bathrooms</Form.Label>
        <Form.Control
          min="0"
          step="1"
          type="number"
          name="bathrooms"
          value={bathrooms}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.bathrooms?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="garden">
        <Form.Check
          className={styles.Checkbox}
          type="checkbox"
          label="Does your property have a garden?"
          name="garden"
          checked={garden}
          value={garden}
          onChange={handleCheckBox}
        />
      </Form.Group>

      <Form.Group controlId="garage">
        <Form.Check
          className={styles.Checkbox}
          type="checkbox"
          label="Does your property have a garage?"
          name="garage"
          checked={garage}
          value={garage}
          onChange={handleCheckBox}
        />
      </Form.Group>

      <Form.Group controlId="isSouthFacing">
        <Form.Check
          className={styles.Checkbox}
          type="checkbox"
          label="Is your property south-facing?"
          name="isSouthFacing"
          checked={isSouthFacing}
          value={isSouthFacing}
          onChange={handleCheckBox}
        />
      </Form.Group>

      <Form.Group controlId="sold">
        <Form.Check
          className={styles.Checkbox}
          type="checkbox"
          label="Has it sold?"
          name="sold"
          checked={sold}
          value={sold}
          onChange={handleCheckBox}
        />
      </Form.Group>
    </div>
  );

  const buttons = (
    <>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        type="submit"
      >
        Save
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
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
          <Col className="py-2 p-1 p-md-2" md={6} lg={6}>
            {/* Image */}
            {imageFields}

            {/* Main Text Fields */}
            <Container className="border-2 p-2 rounded mt-3">
              {mainFields}
            </Container>

            {/* Google Maps API Fields */}
            <Container className="border-2 p-2 rounded">
              {googleMapFields}
            </Container>
          </Col>

          {/* Input Fields */}
          <Col className="p-2">
            <Container className="border-2 p-2 rounded">
              {extraFields}
            </Container>
          </Col>
        </Row>

        {/* Buttons */}
        <Container className="my-4">{buttons}</Container>
      </Form>
    </Container>
  );
}
