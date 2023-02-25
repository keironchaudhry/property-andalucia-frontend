import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/noresults.png";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { fetchMoreData } from "../../utils/utils";
import PropertyDetail from "../property/PropertyDetail";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/property/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center mt-5">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col className="my-2">
              <div>Property Listings: {profile?.propertys_count}</div>
            </Col>
          </Row>
          <Row className="justify-content-center no-gutters">
            <Col className="my-2">
              <div>Followers: {profile?.followers_count}</div>
            </Col>
            <Col className="my-2">
              <div>Following: {profile?.following_count}</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={() => {}}
              >
                Fnfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={() => {}}
              >
                Follow
              </Button>
            ))}
        </Col>
        {profile?.bio && <Col className="p-3">{profile.bio}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s Listings</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((property) => (
            <PropertyDetail key={property.id} {...property} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`${profile?.owner} has no listings yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <PopularProfiles mobile />
      <Col className="py-2 p-0 p-lg-2 mt-2" lg={8}>
        <Container className={styles.Profile}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2 mt-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
