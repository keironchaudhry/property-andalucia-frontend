import React from "react";
import { Container } from "react-bootstrap";

import Profile from "./Profile";
import Asset from "../../components/Asset";
import formStyles from "../../styles/PropertyList.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${formStyles.PopularProfileContainer} ${
        mobile && "d-lg-none text-center mb-3 mt-5"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <h5 className="text-center mt-1 mb-4">Most Popular Sellers</h5>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
