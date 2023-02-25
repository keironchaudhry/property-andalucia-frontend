import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PropertyDetail.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import PropertyDetail from "./PropertyDetail";
import Note from "../notes/Note";
import NoteCreateForm from "../notes/NoteCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
        <p>Popular Sellers for mobile</p>
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
            notes.results.map((note) => (
              <Note key={note.id} {...note} setNotes={setNotes} />
            ))
          ) : currentUser ? (
            <span>No notes yet, be the first to comment!</span>
          ) : (
            <span>No notes... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular Sellers for desktop
      </Col>
    </Row>
  );
}

export default PropertyPage;
