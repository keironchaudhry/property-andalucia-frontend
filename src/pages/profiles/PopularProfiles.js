import React from "react";
import Container from "react-bootstrap/Container";

import Profile from "./Profile";
import Asset from "../../components/asset/Asset.js";
import formStyles from "../../styles/PropertyList.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${formStyles.PopularProfileContainer} ${
        mobile && "d-lg-none text-center mb-3 mt-1"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          {/* Popular Sellers Title */}
          <h5 className="text-center mt-1 mb-4">Most Popular Sellers</h5>
          {/* Mobile view */}
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            // Desktop view
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
