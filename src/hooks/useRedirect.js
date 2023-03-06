import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: userProfile } = await axios.post(
          "/dj-rest-auth/token/refresh/"
        );
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        } else if (userAuthStatus === "notSeller") {
          if (!userProfile.seller_status) {
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
