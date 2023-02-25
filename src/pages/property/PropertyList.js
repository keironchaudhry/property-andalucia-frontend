import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/noresults.png";

import formStyles from "../../styles/PropertyList.module.css";
import btnStyles from "../../styles/Button.module.css";
import PropertyDetail from "./PropertyDetail";
import Asset from "../../components/Asset";
import PopularProfiles from "../profiles/PopularProfiles";

function PropertyList({ message, filter = "" }) {
  const [properties, setProperties] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [province, setProvince] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const fetchProperties = async () => {
    try {
      const { data } = await axiosReq.get(
        `/property/?${filter}&province=${province}&property_type=${propertyType}&bedroom_count=${bedrooms}&bathrooms_count=${bathrooms}`
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
  }, [filter, province, propertyType, bedrooms, bathrooms, pathname]);

  const clearSearchFilter = () => {
    setProvince("");
    setPropertyType("");
    setBedrooms("");
    setBathrooms("");
  };

  const clearSearch = () => {
    if (
      province !== "" ||
      propertyType !== "" ||
      bedrooms !== "" ||
      bathrooms !== ""
    ) {
      clearSearchFilter();
      fetchProperties();
    } else {
      fetchProperties();
    }
  };

  return (
    <Row className="mt-3">
      <PopularProfiles mobile />
      <Col className={`${formStyles.ColContainer} py-2 p-0 p-lg-2`} lg={8}>
        {hasLoaded ? (
          <>
            <div className="text-center mb-2 mt-4">
              {pathname === "/" && properties.count !== 0 && (
                <p className="h3">{properties.count} Properties Up For Sale</p>
              )}
            </div>
            {properties.results.length ? (
              <InfiniteScroll
                children={properties.results.map((property) => (
                  <PropertyDetail
                    key={property.id}
                    {...property}
                    setproperties={setProperties}
                  />
                ))}
                dataLength={properties.results.length}
                loader={<Asset spinner />}
                hasMore={!!properties.next}
                next={() => fetchMoreData(properties, setProperties)}
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

            {/* <div className="d-flex gap-3">
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
            </div> */}

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

              <Form.Group className="text-center ml-2" controlId="bathrooms">
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
        <div className={`${formStyles.PopularProfilesDiv} mt-3`}>
          <PopularProfiles />
        </div>
      </Col>
    </Row>
  );
}

export default PropertyList;
