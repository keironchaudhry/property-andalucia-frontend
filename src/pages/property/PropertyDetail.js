import React from "react";
import { Link } from "react-router-dom";

import { Card, Container, OverlayTrigger, Tooltip } from "react-bootstrap";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/PropertyPost.module.css";
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
      //   console.log(handleUnsave);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={`${styles.PropertyContainer} p-3 p-md-4 rounded`}>
      {/* Property Name & Address*/}
      <div>
        <h2 className="d-flex flex-column align-items-start align-content-start gap-2 me-3">
          <span>{name}</span>
        </h2>
        <h5 className="text-muted">
          <span>
            {municipality}, {street}, {post_code}
          </span>
        </h5>
        <p className="text-muted">
          {created_at === updated_at
            ? `Published on ${created_at}`
            : `Last updated on ${updated_at}`}
        </p>
        {is_owner && propertyPage && "..."}
      </div>

      {/* Image */}
      <Card style={{}}>
        <Card.Img src={image} variant="top" />

        {/* User Profile */}
        <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
          <Link to={`/profiles/${profile_id}`} className="d-md-none">
            <Avatar src={profile_image} height={55} mobile text="Placeholder" />
            {owner}
          </Link>
          <Link to={`/profiles/${profile_id}`} className="d-none d-md-block">
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
    </Container>
  );
};

export default PropertyDetail;
