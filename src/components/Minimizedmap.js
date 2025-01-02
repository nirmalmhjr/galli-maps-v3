import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import logo from "../assets/images/galli-maps-logo.png";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// import { mapStyleUrl } from "../../urls/urls";
import conf from "../conf/conf";

const Minimizedmap = ({ lng, lat }) => {
  // const [lng, setLng] = useState(85.32239);
  // const [lat, setLat] = useState(27.677106);
  // const [zoomLevel, setZoomLevel] = useState(14);

  const mapStyleUrl = `https://map-init.gallimap.com/styles/light/style.json?accessToken=${conf.mapToken}`;

  useEffect(() => {
    console.log("Longitude:", lng, "Latitude:", lat);
  }, [lng, lat]);

  return (
    <div>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          // zoom: zoomLevel,
          zoom: 14,
        }}
        style={{ width: "90vh", minHeight: "80vh" }}
        mapStyle={mapStyleUrl}
        attributionControl={false}
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <div className="marker">
            <img
              // src="https://img.icons8.com/ios-filled/50/000000/marker.png"
              src={logo}
              alt="marker"
              style={{ width: "25px", height: "25px" }}
            />
          </div>
        </Marker>
      </Map>
    </div>
  );
};

export default Minimizedmap;
