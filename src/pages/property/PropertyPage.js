import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "../../styles/PropertyDetail.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import PropertyDetail from "./PropertyDetail";
import Note from "../notes/Note";
import NoteCreateForm from "../notes/NoteCreateForm";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";

function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState({ results: [] });
  const [notes, setNotes] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    setNotes({ results: [] });
    const handleMount = async () => {
      try {
        const [{ data: property }, { data: notes }] = await Promise.all([
          axiosReq.get(`/property/${id}`),
          axiosReq.get(`/notes/?property=${id}`),
        ]);
        setProperty({ results: [property] });
        setNotes(notes);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <PropertyDetail
          {...property.results[0]}
          setProperty={setProperty}
          propertyPage
        />
        <Container className={styles.PropertyContainer}>
          {currentUser ? (
            <NoteCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              property={id}
              setNotes={setNotes}
            />
          ) : notes.results.length ? (
            "Comments"
          ) : null}
          {notes.results.length ? (
            <InfiniteScroll
              children={notes.results.map((note) => (
                <Note
                  key={note.id}
                  {...note}
                  setProperty={setProperty}
                  setNotes={setNotes}
                />
              ))}
              dataLength={notes.results.length}
              loader={<Asset spinner />}
              hasMore={!!notes.next}
              next={() => fetchMoreData(notes, setNotes)}
            />
          ) : currentUser ? (
            <div className="mb-4 text-center">
              <span>Leave yourself a private note here. Don't worry, they can't be seen by anyone else.</span>
            </div>
          ) : (
            <div className="mt-4 mb-4 text-center">
              <span>
                <u>
                  Create an account or login to leave private notes.
                </u>
              </span>
            </div>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2 border-0 mt-1">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PropertyPage;
