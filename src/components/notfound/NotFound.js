import React from "react";
import NoResults from "../asset/Asset.js";
import styles from "./NotFound.module.css";
import Asset from "../asset/Asset.js";

/**
 * Code adapted from Code Institute's "Moments" walkthrough.
 */

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
        <Asset src={NoResults} message={"The page you're looking for does not exist."} />
    </div>
  )
}

export default NotFound