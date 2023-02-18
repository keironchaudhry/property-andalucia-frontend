import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function PropertyPage() {
  const { id } = useParams();
  const [propertyPost, setPropertyPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: propertyPost }] = await Promise.all([
          axiosReq.get(`/property/${id}`),
        ]);
        setPropertyPost({ results: [propertyPost] });
        console.log(propertyPost);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Sellers for mobile</p>
        <p>Property component</p>
        <Container className={appStyles.Content}>Notes</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular Sellers for desktop
      </Col>
    </Row>
  );
}

export default PropertyPage;
