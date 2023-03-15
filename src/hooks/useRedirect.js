import { useEffect } from "react";
import { useHistory } from "react-router";

import { axiosReq } from "../api/axiosDefaults";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: currentUser } = await axiosReq.get("/dj-rest-auth/user/");
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        } else if (userAuthStatus === "notSeller") {
          if (!currentUser.seller_status) {
            history.push("/");
          }
        } else if (userAuthStatus === "notStaff") {
          if (!currentUser.is_staff) {
            history.push("/");
          }
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
