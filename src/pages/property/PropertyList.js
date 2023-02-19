import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/noresults.png";

import PropertyDetail from "./PropertyDetail";
import Asset from "../../components/Asset";

function PropertyList({ message, filter = "" }) {
  const [properties, setProperties] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axiosReq.get(`/property/?${filter}`)
        setProperties(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchProperties();
  }, [filter, pathname]);

  return (
    <Row className="mt-5">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {properties.results.length ? (
              properties.results.map((property) => (
                <PropertyDetail
                  key={property.id}
                  {...property}
                  setProperties={setProperties}
                />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PropertyList;
