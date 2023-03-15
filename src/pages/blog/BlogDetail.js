import React from "react";
import { Link, useHistory } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import Container from "react-bootstrap/Container";

import Avatar from "../../components/Avatar";
import styles from "../../styles/PropertyDetail.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card } from "react-bootstrap";

const BlogDetail = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    created_at,
    updated_at,
    blogPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  return (
    <Container
      className={`${styles.PropertyContainer} mt-3 p-3 p-md-4 rounded mt-1 container-fluid`}
    >
      <Container className="align-items-center justify-content-between">
        <div className="d-flex flex-row justify-content-between mb-3">
          <h3 className="align-items-center">
            <span>{title}</span>
          </h3>
          <div className="d-flex align-items-center">
            {is_owner && blogPage && "..."}
          </div>
        </div>
      </Container>
      <Card className="mr-3 ml-3">
        <Card.Img src={image} variant="top" alt="Blog image" />
      </Card>
      <Container className="mt-4 h5 text-center">
        <p>{content}</p>
      </Container>
      <Container className="d-flex justify-content-between align-items-center">
        <p className="text-muted mt-3">
          {created_at === updated_at
            ? `Published on ${created_at}`
            : `Last updated on ${updated_at}`}
        </p>
        <h5>
          by {owner}
          <Link className="ml-2" to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={40} />
          </Link>
        </h5>
      </Container>
    </Container>
  );
};

export default BlogDetail;
