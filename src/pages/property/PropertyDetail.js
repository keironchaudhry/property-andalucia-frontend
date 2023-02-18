import React from "react";

import { Card, Container } from "react-bootstrap";

import styles from "../../styles/PropertyPost.module.css";
import Avatar from "../../components/Avatar";

const PropertyDetail = (props) => {
  const {} = props;
  return (
    <Container className={`${styles.PropertyContainer} p-3 p-md-4 rounded`}>
      {/* Property Name */}
      <h3 className="d-flex flex-column align-items-start align-content-start gap-2 mb-4 me-3">
        <span>Property Name</span>
        <span>Property Address</span>
      </h3>

      {/* Image */}
      <Card style={{}}>
        <Card.Img className="" src="" variant="top" />
        <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
          <div className="d-md-none">
            <Avatar src="" mobile text="Placeholder" />
          </div>
          <div className="d-none d-md-block">
            <Avatar src="" text="Placeholder" />
          </div>
        </Card.Body>
      </Card>

      {/* Property Header */}
      <div className="d-flex flex-row justify-content-between">
        <p>Bedrooms</p>
        <p>Bathrooms</p>
        <p>Size m2</p>
        <p>Save</p>
      </div>

      {/* Price */}
      <div>
        <p>Price in euros</p>
      </div>

      {/* Property Info */}
      <div className="mt-4">
        <h2>Property Info</h2>
        <ul>
          <li>province</li>
          <li>propertyType</li>
          <li>bedrooms</li>
          <li>bathrooms</li>
          <li>garden</li>
          <li>garage</li>
          <li>isSouthFacing</li>
        </ul>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h2>Description</h2>
        <p>Description</p>
      </div>

      {/* Google Maps API */}
      <div className="mt-4">
        <h2>Location</h2>
        <div style={{ height: "350px", width: "100%" }}></div>
      </div>
    </Container>
  );
};

export default PropertyDetail;
