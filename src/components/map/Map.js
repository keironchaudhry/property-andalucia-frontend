import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

/**
 * Code adapted from tutorial by "Google Maps Platform" on YouTube.
 * URL: https://www.youtube.com/watch?v=9e-5QHpadi0
 * "@react-google-maps/api" documentation also helped in adapting this code.
 * URL: https://www.npmjs.com/package/@react-google-maps/api
 */

const Map = (props) => {
  const { latitude, longitude } = props;
  const center = {
    lat: latitude,
    lng: longitude,
  };

  const container = {
    width: "100%",
    height: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API}>
      <GoogleMap
        mapContainerStyle={container}
        center={center}
        zoom={15}
        clickableIcons={false}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
