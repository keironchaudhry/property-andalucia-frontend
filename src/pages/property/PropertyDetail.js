import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Card, Container, OverlayTrigger, Tooltip } from "react-bootstrap";

import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/PropertyDetail.module.css";
import Avatar from "../../components/Avatar";
import Map from "../../components/Map";

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
    setPropertyPost,
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
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await axiosRes.post("/saves/", { property: id });
      setPropertyPost((prevProperty) => ({
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
      console.log(err);
    }
  };

  const handleUnsave = async () => {
    try {
      await axiosRes.delete(`/saves/${save_id}/`);
      setPropertyPost((prevProperty) => ({
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
      console.log(err);
    }
  };

  return (
    <>
      {propertyPage ? (
        <Container className={`${styles.PropertyContainer} p-3 p-md-4 rounded`}>
          {/* Property Name & Address*/}
          <Container className="align-items-center justify-content-between">
            <div className="d-flex flex-row justify-content-between mb-3">
              <h3 className="align-items-center">
                <span>{name}</span>
              </h3>
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
          <Card style={{}}>
            <Card.Img src={image} variant="top" />

            {/* User Profile */}
            <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
              <Link to={`/profiles/${profile_id}`} className="d-md-none">
                <Avatar
                  src={profile_image}
                  height={55}
                  mobile
                  text="Placeholder"
                />
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
              <i class="fa-solid fa-bed"></i>
              {bedroom_count} bedroom(s)
            </p>
            <p>
              <i class="fa-sharp fa-solid fa-sink"></i>
              {bathrooms_count} bathroom(s)
            </p>
            <p>{size}m²</p>
          </div>

          {/* Property Info */}
          <div className="mt-4">
            <h2 className="mb-3">Property Info</h2>
            <ul className={`h5`}>
              <li>Price: {price}€</li>
              <li className="text-capitalize">{province}</li>
              <li className="text-capitalize">{property_type}</li>
              <li>Total bedrooms: {bedroom_count}</li>
              <li>Total bathrooms: {bathrooms_count}</li>
              {garden && <li>This property has a garden.</li>}
              {garage && <li>This property has parking.</li>}
              {is_south_facing && <li>This property is south-facing.</li>}
            </ul>
          </div>

          {/* Description */}
          <div className="mt-4 h5">
            <h2 className="mb-3">Description</h2>
            <p>{description}</p>
          </div>

          {/* Google Maps API */}
          <div className="mt-4">
            <h2 className="mb-3">Location</h2>
            <div style={{ height: "350px", width: "100%" }}>
              <Map latitude={latitude} longitude={longitude} />
            </div>
          </div>

          <p className="text-muted mt-4">
            {created_at === updated_at
              ? `Published on ${created_at}`
              : `Last updated on ${updated_at}`}
          </p>
        </Container>
      ) : (
        // Property Listing View
        <Container className={`${styles.PropertyContainer} p-3 p-md-4 rounded`}>
          {/* Property Name & Address*/}
          <div>{is_owner && propertyPage && "..."}</div>

          {/* Image */}
          <Card style={{}}>
            <Link to={`/property/${id}`}>
              <Card.Img src={image} variant="top" />
            </Link>

            {/* User Profile */}
            <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
              <Link to={`/profiles/${profile_id}`} className="d-md-none">
                <Avatar
                  src={profile_image}
                  height={55}
                  mobile
                  text="Placeholder"
                />
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
                <i class="fa-solid fa-bed"></i>
                {bedroom_count} bedroom(s)
              </p>
              <p>
                <i class="fa-sharp fa-solid fa-sink"></i>
                {bathrooms_count} bathroom(s)
              </p>
              <p>{size}m²</p>
            </div>

            {/* Property Name */}
            <div className="d-flex flex-column align-items-start align-content-start gap-2 me-3 mt-1">
              <h4>
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
