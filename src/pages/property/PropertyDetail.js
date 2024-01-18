import React from "react";
import { Link, useHistory } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";

import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/PropertyDetail.module.css";
import Avatar from "../../components/avatar/Avatar.js";
import Map from "../../components/Map";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

const PropertyDetail = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_email,
    profile_telephone,
    profile_image,
    save_id,
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
    created_at,
    updated_at,
    setProperty,
    propertyPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/property/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/property/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await axiosRes.post("/saves/", { property: id });
      setProperty((prevProperty) => ({
        ...prevProperty,
        results: prevProperty.results.map((property) => {
          return property.id === id
            ? {
                ...property,
                saves_count: property.saves_count + 1,
                save_id: data.id,
              }
            : property;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnsave = async () => {
    try {
      await axiosRes.delete(`/saves/${save_id}/`);
      setProperty((prevProperty) => ({
        ...prevProperty,
        results: prevProperty.results.map((property) => {
          return property.id === id
            ? {
                ...property,
                saves_count: property.saves_count - 1,
                save_id: null,
              }
            : property;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Popover created to display post owner info
  // Works only if current user is authenticated
  const handlePopover = currentUser ? (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Contact details</Popover.Title>
      <Popover.Content>
        <span className="d-block p-2">Phone: {profile_telephone}</span>
        <span className="d-block p-2">E-mail: {profile_email}</span>
      </Popover.Content>
    </Popover>
  ) : (
    <Popover id="popover-basic">
      <Popover.Content>
        Login or create an account to view contact details.
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      {propertyPage ? (
        <Container
          className={`${styles.PropertyContainer} p-3 p-md-4 rounded mt-1`}
        >
          {/* Property Name & Address*/}
          <Container className="align-items-center justify-content-between">
            <div className="d-flex flex-row justify-content-between mb-3">
              <h4 className="align-items-center">
                <span>{name}</span>
              </h4>
              <div className="d-flex align-items-center">
                {is_owner && propertyPage && (
                  <MoreDropdown
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </Container>

          {/* Image */}
          <Card>
            <Card.Img src={image} variant="top" alt="Property image" />

            {/* "Sold" Overlay Banner */}
            {sold && (
              <Card.ImgOverlay className={`${styles.Sold} border border-dark`}>
                <p>Sold</p>
              </Card.ImgOverlay>
            )}

            {/* User Profile */}
            <Card.Body className="d-flex flex-sm-row justify-content-between align-items-center">
              <Link to={`/profiles/${profile_id}`} className="d-md-none">
                <Avatar src={profile_image} height={45} mobile />
                {owner}
              </Link>
              <Link
                to={`/profiles/${profile_id}`}
                className="d-none d-md-block"
              >
                <Avatar src={profile_image} height={55} text={owner} />
              </Link>

              {/* Save */}
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You cannot save your own post.</Tooltip>}
                >
                  <i className="far fa-bookmark fa-2x" />
                </OverlayTrigger>
              ) : save_id ? (
                <span onClick={handleUnsave}>
                  <i className={`fas fa-bookmark fa-2x ${styles.Orange}`}></i>
                </span>
              ) : currentUser ? (
                <span onClick={handleSave}>
                  <i
                    className={`far fa-bookmark fa-2x ${styles.OrangeOutline}`}
                  ></i>
                </span>
              ) : (
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>Please login to save posts.</Tooltip>}
                >
                  <i
                    className={`far fa-bookmark fa-2x ${styles.OrangeOutline}`}
                  ></i>
                </OverlayTrigger>
              )}
            </Card.Body>
          </Card>

          {/* Property Header */}
          <div
            className={`${styles.Icons} d-flex flex-row justify-content-between h5 mt-3`}
          >
            <p>
              <i className="fa-solid fa-bed"></i>
              {bedroom_count} bed
            </p>
            <p>
              <i className="fa-sharp fa-solid fa-sink"></i>
              {bathrooms_count} bath
            </p>
            <p>
              <i className="fa-solid fa-ruler"></i>
              {size}m²
            </p>
          </div>

          {/* Description */}
          <div className="mt-4 h5 text-center">
            <p>{description}</p>
          </div>

          {/* Property Info */}
          <div className="mt-5">
            <h4 className="mb-4 text-center">
              <u>Property Info</u>
            </h4>
            <div className="d-flex flex-row justify-content-between">
              <Col>
                <h5 className="mb-3">Basic characteristics:</h5>
                <ul className={styles.ListMobileSpacing}>
                  <li>Price: {price}€</li>
                  <li className="text-capitalize">Province: {province}</li>
                  <li className="text-capitalize">Type: {property_type}</li>
                  <li>Size: {size}m²</li>
                  <li>Total bedrooms: {bedroom_count}</li>
                  <li>Total bathrooms: {bathrooms_count}</li>
                </ul>
              </Col>
              <Col>
                <h5 className="mb-3">Additional information:</h5>
                <ul className={styles.ListMobileSpacing}>
                  {garden ? (
                    <li>This property has a garden.</li>
                  ) : (
                    <li>This property does not have a garden.</li>
                  )}
                  {garage ? (
                    <li>This property has parking.</li>
                  ) : (
                    <li>This property does not have parking.</li>
                  )}
                  {is_south_facing ? (
                    <li>This property is south-facing.</li>
                  ) : (
                    <li>This property is not south-facing.</li>
                  )}
                </ul>
              </Col>
            </div>
          </div>

          {/* Contact Info Button */}
          <div className="text-center mt-4 pb-4">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={handlePopover}
            >
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                type="submit"
              >
                <strong>Contact Info</strong>
              </Button>
            </OverlayTrigger>
          </div>

          {/* Google Maps API */}
          <div className="mt-4">
            <h4 className="mb-4 text-center">
              <u>Location</u>
            </h4>
            <div style={{ height: "350px", width: "100%" }}>
              <Map latitude={latitude} longitude={longitude} />
            </div>
          </div>

          <div className="text-right">
            <p className="text-muted mt-3">
              {created_at === updated_at
                ? `Published on ${created_at}`
                : `Last updated on ${updated_at}`}
            </p>
          </div>
        </Container>
      ) : (
        // Property Listing View
        <Container className={`${styles.ListContainer} p-3 p-md-4 rounded`}>
          
          {/* Image */}
          <Card>
            <Link to={`/property/${id}`}>
              <Card.Img src={image} variant="top" alt="Property image" />
            </Link>

            {/* "Sold" Overlay Banner */}
            {sold && (
              <Card.ImgOverlay className={`${styles.Sold} border border-dark`}>
                <p>Sold</p>
              </Card.ImgOverlay>
            )}

            {/* User Profile */}
            <Card.Body className="d-flex flex-sm-row justify-content-between align-items-center">
              <Link to={`/profiles/${profile_id}`} className="d-md-none">
                <Avatar src={profile_image} height={45} mobile />
                {owner}
              </Link>
              <Link
                to={`/profiles/${profile_id}`}
                className="d-none d-md-block"
              >
                <Avatar src={profile_image} height={55} text={owner} />
              </Link>

              {/* Save */}
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You cannot save your own post.</Tooltip>}
                >
                  <i className="far fa-bookmark fa-2x" />
                </OverlayTrigger>
              ) : save_id ? (
                <span onClick={handleUnsave}>
                  <i className={`fas fa-bookmark fa-2x ${styles.Orange}`}></i>
                </span>
              ) : currentUser ? (
                <span onClick={handleSave}>
                  <i
                    className={`far fa-bookmark fa-2x ${styles.OrangeOutline}`}
                  ></i>
                </span>
              ) : (
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>Please login to save posts.</Tooltip>}
                >
                  <i
                    className={`far fa-bookmark fa-2x ${styles.OrangeOutline}`}
                  ></i>
                </OverlayTrigger>
              )}
            </Card.Body>
          </Card>

          {/* Property Header */}
          <Container className={styles.ColContainer}>
            <div
              className={`${styles.Icons} d-flex flex-row justify-content-between h5 mt-3`}
            >
              <p>
                <i className="fa-solid fa-bed"></i>
                {bedroom_count} bed
              </p>
              <p>
                <i className="fa-sharp fa-solid fa-sink"></i>
                {bathrooms_count} bath
              </p>
              <p>
                <i className="fa-solid fa-ruler"></i>
                {size}m²
              </p>
            </div>

            {/* Property Name */}
            <div className="d-flex flex-column align-items-start align-content-start gap-2 me-3 mt-1">
              <h4 className={styles.PropertyNameMobile}>
                <span>{name}</span>
              </h4>
              <h5 className="text-muted">
                <span className="text-capitalize">
                  {province}, {municipality}, {street}, {post_code}
                </span>
              </h5>
              <h5 className="text-muted">
                <span>Price: {price.toLocaleString()}€</span>
              </h5>
            </div>

            {/* Description */}
            <div className="mt-2">
              <p>{description}</p>
            </div>

            {/* View More & Date */}
            <div className="mt-4 mb-3 d-flex justify-content-between">
              <Link to={`/property/${id}`}>
                <p className={`${styles.ViewMore} m-0`}>View more...</p>
              </Link>
              <p className="mb-1 text-muted">
                {created_at === updated_at
                  ? `Published on ${created_at}`
                  : `Last updated on ${updated_at}`}
              </p>
            </div>
          </Container>
        </Container>
      )}
    </>
  );
};

export default PropertyDetail;
