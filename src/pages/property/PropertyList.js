import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/noresults.png";

import styles from "../../styles/PropertyDetail.module.css";
import formStyles from "../../styles/PropertyList.module.css";
import btnStyles from "../../styles/Button.module.css";
import PropertyDetail from "./PropertyDetail";
import Asset from "../../components/Asset";

function PropertyList({ message, filter = "" }) {
  const [properties, setProperties] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [province, setProvince] = useState("");

  const fetchProperties = async () => {
    try {
      const { data } = await axiosReq.get(
        `/property/?${filter}&province=${province}`
      );

      setProperties(data);
      setHasLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchProperties();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, province, pathname]);

  const clearSearchFilter = () => {
    setProvince("");
  };

  const clearSearch = () => {
    if (province !== "") {
      clearSearchFilter();
      fetchProperties();
    } else {
      fetchProperties();
    }
  };

  return (
    <Row className="mt-5">
      <Col className={`${formStyles.ColContainer} py-2 p-0 p-lg-2`} lg={8}>
        {/* <p>Popular profiles mobile</p> */}
        {hasLoaded ? (
          <>
            <div className="text-center mb-2 mt-4">
              {pathname === "/" && properties.count !== 0 && (
                <p className="h3">{properties.count} Properties Up For Sale</p>
              )}
            </div>
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
        {/* Province Search Feed */}
        <div className={formStyles.FormContainer}>
          <Form>
            <Form.Group className="text-center mt-2" controlId="province">
              <Form.Label>Search by province</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="province"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                className="text-center"
              >
                <option value="">Select a province</option>
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

            <Form.Group className="text-center" controlId="propertyType">
              <Form.Label>Search by property</Form.Label>
              <Form.Control
                as="select"
                type="text"
                className="text-center"
                name="propertyType"
              >
                <option value="">Select a property type</option>
                <option value="apartment">Apartment</option>
                <option value="detached">Detached</option>
                <option value="semi-detached">Semi-detached</option>
                <option value="terraced">Terraced</option>
                <option value="end terrace">End Terrace</option>
                <option value="cottage">Cottage</option>
                <option value="bungalows">Bungalows</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex gap-3">
              <Form.Group className="text-center mr-2" controlId="minPrice">
                <Form.Label>Min Price</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  name="minPrice"
                  min={0}
                  step={50000}
                />
              </Form.Group>

              <Form.Group className="text-center ml-2" controlId="maxPrice">
                <Form.Label>Max Price</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  name="maxPrice"
                  min={0}
                  step={50000}
                />
              </Form.Group>
            </div>

            <div className="d-flex gap-3">
              <Form.Group className="text-center mr-2" controlId="minBedrooms">
                <Form.Label className="me-2">Min Bedrooms</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  name="minBedrooms"
                  min={0}
                  step={1}
                />
              </Form.Group>

              <Form.Group className="text-center ml-2" controlId="maxBedrooms">
                <Form.Label className="me-2">Max Bedrooms</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  name="maxBedrooms"
                  min={0}
                  step={1}
                />
              </Form.Group>
            </div>

            {/* Buttons */}
            <div className="flex-row text-center pt-1 pb-1">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                type="submit"
                aria-label="Search"
                onClick={clearSearch}
              >
                <i class="fa-solid fa-rotate-left"></i>Clear Filter
              </Button>
            </div>
          </Form>
        </div>

        {/* Popular Profiles */}
        <div className="mt-3">
          <p>Popular profiles for desktop</p>
        </div>
      </Col>
    </Row>
  );
}

export default PropertyList;
