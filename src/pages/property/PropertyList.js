import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import PropertyDetail from "./PropertyDetail";
import Asset from "../../components/asset/Asset.js";
import PopularProfiles from "../profiles/PopularProfiles";

import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NoResults from "../../assets/noresults.png";

import appStyles from "../../App.module.css";
import formStyles from "./PropertyList.module.css";

/**
 * Search form has been created to filter down results based
 * on : province, property type, price, bedroom/bathroom count.
 */

function PropertyList({ message, filter = "" }) {
  const currentUser = useCurrentUser();

  const [property, setProperty] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [province, setProvince] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProperties = async () => {
    try {
      const { data } = await axiosReq.get(
        `/property/?${filter}&province=${province}&property_type=${propertyType}&bedroom_count=${bedrooms}&bathrooms_count=${bathrooms}&price_min=${minPrice}&price_max=${maxPrice}`
      );

      setProperty(data);
      setHasLoaded(true);
    } catch (err) {
      // console.log(err);
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
    // eslint-disable-next-line
  }, [
    filter,
    province,
    propertyType,
    bedrooms,
    bathrooms,
    minPrice,
    maxPrice,
    pathname,
    currentUser,
  ]);

  const clearSearchFilter = () => {
    setProvince("");
    setPropertyType("");
    setBedrooms("");
    setBathrooms("");
    setMinPrice("");
    setMaxPrice("");
  };

  const clearSearch = () => {
    if (
      province !== "" ||
      propertyType !== "" ||
      bedrooms !== "" ||
      bathrooms !== "" ||
      minPrice !== "" ||
      maxPrice !== ""
    ) {
      clearSearchFilter();
    }
    fetchProperties();
  };

  return (
    <Row className="mt-3">
      <PopularProfiles mobile />
      <Col className={`${formStyles.ColContainer} py-2 p-0 p-lg-2`} lg={8}>
        {hasLoaded ? (
          <>
            {/* Property posts count display */}
            <div className="text-center mb-2 mt-4">
              {pathname === "/" && property.count !== 0 && (
                <p className={`${formStyles.PropertiesAvailableMobile} h3`}>
                  {property.count} Properties Up For Sale
                </p>
              )}
            </div>
            {/* Property posts */}
            {property.results.length ? (
              <InfiniteScroll
                children={property.results.map((property) => (
                  <PropertyDetail
                    key={property.id}
                    {...property}
                    setProperty={setProperty}
                  />
                ))}
                dataLength={property.results.length}
                loader={<Asset spinner />}
                hasMore={!!property.next}
                next={() => fetchMoreData(property, setProperty)}
              />
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
        <Accordion className={formStyles.FormContainer}>
          <Card className="border-0">
            <Accordion.Toggle
              as={Card.Header}
              variant="link"
              eventKey="0"
              className="font-weight-light text-reset text-decoration-none text-center"
            >
              <h5 className={`${formStyles.SearchFilterTitle} pt-1`}>
                Search Filters
              </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Form className="pl-3 pr-3 pb-3">
                {/* Search by province form */}
                <Form.Group className="text-center mt-3" controlId="province">
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

                {/* Search by property form */}
                <Form.Group className="text-center" controlId="propertyType">
                  <Form.Label>Search by property</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    name="propertyType"
                    value={propertyType}
                    onChange={(event) => setPropertyType(event.target.value)}
                    className="text-center"
                  >
                    <option value="">Select a property type</option>
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

                {/* Search by min/max price forms */}
                <div className="d-flex gap-3">
                  <Form.Group className="text-center mr-2" controlId="minPrice">
                    <Form.Label> Min. Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="minPrice"
                      min={0}
                      step={50000}
                      className="text-center"
                      value={minPrice}
                      onChange={(event) => setMinPrice(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="text-center ml-2" controlId="maxPrice">
                    <Form.Label>Max. Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxPrice"
                      min={0}
                      step={50000}
                      className="text-center"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(event.target.value)}
                    />
                  </Form.Group>
                </div>

                {/* Search by bedroom/bathroom count forms */}
                <div className="d-flex gap-3">
                  <Form.Group className="text-center mr-2" controlId="bedrooms">
                    <Form.Label className="me-2">Bedrooms</Form.Label>
                    <Form.Control
                      type="number"
                      name="bedrooms"
                      min={0}
                      step={1}
                      value={bedrooms}
                      onChange={(event) => setBedrooms(event.target.value)}
                      className="text-center"
                    />
                  </Form.Group>

                  <Form.Group
                    className="text-center ml-2"
                    controlId="bathrooms"
                  >
                    <Form.Label className="me-2">Bathrooms</Form.Label>
                    <Form.Control
                      type="number"
                      name="bathrooms"
                      min={0}
                      step={1}
                      value={bathrooms}
                      onChange={(event) => setBathrooms(event.target.value)}
                      className="text-center"
                    />
                  </Form.Group>
                </div>

                {/* Buttons */}
                <div className="flex-row text-center pt-1 pb-1">
                  <Button
                    className={`${appStyles.Button} ${appStyles.Bright}`}
                    type="submit"
                    aria-label="Search"
                    onClick={clearSearch}
                  >
                    <i className="fa-solid fa-rotate-left"></i>Clear Filter
                  </Button>
                </div>
              </Form>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* Popular Profiles */}
        <div className={`${formStyles.PopularProfilesDiv} mt-3`}>
          <PopularProfiles />
        </div>
      </Col>
    </Row>
  );
}

export default PropertyList;
