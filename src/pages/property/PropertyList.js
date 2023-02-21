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
      <Col className={`${styles.ColContainer} py-2 p-0 p-lg-2`} lg={8}>
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
            <Form.Group className="text-center" controlId="province">
              <Form.Label className="h5 mb-3">Search by province</Form.Label>
              <Form.Control
                as="select"
                type="text"
                name="province"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
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

            {/* Buttons */}
            <div className="d-flex flex-row justify-content-between">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                type="submit"
                aria-label="Search"
                onClick={clearSearch}
              >
                <i class="fa-solid fa-rotate-left"></i>Clear Filter
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                type="submit"
              >
                <i class="fa-solid fa-filter"></i>More Filters
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
