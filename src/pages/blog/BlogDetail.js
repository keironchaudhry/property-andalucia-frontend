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

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

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
    <>
      {blogPage ? (
        // Blog Detail View
        <Container
          className={`${styles.PropertyContainer} mt-3 p-3 p-md-4 rounded mt-1 container-fluid`}
        >
          <Container className="align-items-center justify-content-between">
            <div className="d-flex flex-row justify-content-between mb-3">
              {/* Blog Title */}
              <h3 className="align-items-center">
                <span className={mobileStyles.TitleMobileScreen}>{title}</span>
              </h3>

              {/* Dropdown Component */}
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

          {/* Blog Image */}
          <Card className={`${mobileStyles.ContainerMobileScreen} mr-3 ml-3`}>
            <Card.Img src={image} variant="top" alt="Blog image" />
          </Card>

          {/* Blog Content */}
          <Container className="mt-4 h5 text-center">
            <p className={mobileStyles.ContentMobileScreen}>{content}</p>
          </Container>

          {/* Blog Date */}
          <Container className="d-flex justify-content-between align-items-center">
            <p className={`${mobileStyles.DateMobileScreen} text-muted mt-3`}>
              {created_at === updated_at
                ? `Published on ${created_at}`
                : `Last updated on ${updated_at}`}
            </p>

            {/* Blog Owner Name + Avatar */}
            <h5 className={mobileStyles.OwnerMobileScreen}>
              by {owner}
              <Link className="ml-2" to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={40} />
              </Link>
            </h5>
          </Container>
        </Container>
      ) : (
        // List View
        <Container
          className={`${styles.PropertyContainer} mt-3 p-3 p-md-4 rounded mt-1 container-fluid`}
        >
          <Container className="align-items-center justify-content-between">
            <div className="d-flex flex-row justify-content-between mb-3">
              {/* Blog Title */}
              <h3 className="align-items-center">
                <span className={mobileStyles.TitleMobileScreen}>{title}</span>
              </h3>

              {/* Dropdown Component */}
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

          {/* Blog Image */}
          <Card className={`${mobileStyles.ContainerMobileScreen} mr-3 ml-3`}>
            <Link to={`/blog/${id}`}>
              <Card.Img src={image} variant="top" alt="Blog image" />
            </Link>
          </Card>

          {/* Blog Content (Shorted) */}
          <Container className="mt-4 h5 text-center">
            <p className={mobileStyles.ContentMobileScreen}>{`${content
              .slice(0, 300)
              .trimEnd()}...`}</p>
          </Container>
          <Link className="text-center" to={`/blog/${id}`}>
            <p className={`${styles.ViewMore} m-0 mt-4 mb-4`}>Read more...</p>
          </Link>

          {/* Blog Date */}
          <Container className="d-flex justify-content-between align-items-center">
            <p className={`${mobileStyles.DateMobileScreen} text-muted mt-3`}>
              {created_at === updated_at
                ? `Published on ${created_at}`
                : `Last updated on ${updated_at}`}
            </p>

            {/* Blog Owner Name + Avatar */}
            <h5 className={mobileStyles.OwnerMobileScreen}>
              by {owner}
              <Link className="ml-2" to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={40} />
              </Link>
            </h5>
          </Container>
        </Container>
      )}
    </>
  );
};

export default BlogDetail;
