import React from "react";
import styles from "../styles/Avatar.module.css";

/**
 * Code provided by Code Institute's "Moments" walkthrough.
 */

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={`${styles.Avatar} mr-1`}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
