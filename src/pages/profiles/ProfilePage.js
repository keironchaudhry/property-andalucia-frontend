import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";

import Asset from "../../components/asset/Asset.js";

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
import { ProfileEditDropdown } from "../../components/moredropdown/MoreDropdown.js";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

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
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center mt-5">
        {/* Profile image */}
        <Col lg={3} className="text-lg-left">
          <Image
            className={`${styles.ProfileImage}`}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          {/* Profile owner */}
          <h3 className="m-2">{profile?.owner}</h3>
          {/* Profile-related property count */}
          <Row className="justify-content-center no-gutters">
            <Col className="my-2">
              <div>Property Listings: {profile?.propertys_count}</div>
            </Col>
          </Row>
          {/* Profile-related follow/following count */}
          <Row className="justify-content-center no-gutters mb-4">
            <Col className="my-2">
              <div>Followers: {profile?.followers_count}</div>
            </Col>
            <Col className="my-2">
              <div>Following: {profile?.following_count}</div>
            </Col>
          </Row>
        </Col>
        {/* Follow/unfollow buttons */}
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright}`}
                onClick={() => handleFollow(profile)}
              >
                Follow
              </Button>
            ))}
        </Col>
        {/* Profile bio description */}
        {profile?.bio && <Col className="p-3 pb-5">{profile.bio}</Col>}
      </Row>
    </>
  );

  // Profile property listings
  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center h5">
        <i className="fa-solid fa-list mr-1"></i>
        {profile?.owner}'s Listings
      </p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((property) => (
            <PropertyDetail
              key={property.id}
              {...property}
              setPosts={setProfilePosts}
            />
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
      {/* Popular sellers : mobile */}
      <PopularProfiles mobile />
      <Col className="py-2 p-0 p-lg-2 mt-2" lg={8}>
        {/* Profile info : if seller, show posts, if not seller, leave empty */}
        <Container className={styles.Profile}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {profile?.seller_status && mainProfilePosts} 
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      {/* Popular sellers : desktop */}
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2 mt-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
