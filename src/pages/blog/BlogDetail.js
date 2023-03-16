import React from "react";
import { Link, useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Avatar from "../../components/Avatar";
import styles from "../../styles/PropertyDetail.module.css";
import mobileStyles from "../../styles/BlogDetail.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

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

  const handleEdit = () => {
    history.push(`/blog/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/blog/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container
      className={`${styles.PropertyContainer} mt-3 p-3 p-md-4 rounded mt-1 container-fluid`}
    >
      <Container className="align-items-center justify-content-between">
        <div className="d-flex flex-row justify-content-between mb-3">
          <h3 className="align-items-center">
            <span className={mobileStyles.TitleMobileScreen}>{title}</span>
          </h3>
          <div className="d-flex align-items-center">
            {is_owner && blogPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </Container>
      <Card className={`${mobileStyles.ContainerMobileScreen} mr-3 ml-3`}>
        <Link to={`/blog/${id}`}>
          <Card.Img src={image} variant="top" alt="Blog image" />
        </Link>
      </Card>
      <Container className="mt-4 h5 text-center">
        <p className={mobileStyles.ContentMobileScreen}>{content}</p>
      </Container>
      <Container className="d-flex justify-content-between align-items-center">
        <p className={`${mobileStyles.DateMobileScreen} text-muted mt-3`}>
          {created_at === updated_at
            ? `Published on ${created_at}`
            : `Last updated on ${updated_at}`}
        </p>
        <h5 className={mobileStyles.OwnerMobileScreen}>
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
