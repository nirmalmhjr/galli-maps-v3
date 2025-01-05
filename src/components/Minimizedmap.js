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

// import React, { useState, useEffect, useRef } from "react";
// import Map, { Marker } from "react-map-gl/maplibre";
// import logo from "../assets/images/pin.png";

// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";
// // import { mapStyleUrl } from "../../urls/urls";
// import conf from "../conf/conf";

// const Minimizedmap = ({ lng, lat }) => {
//   // const [lng, setLng] = useState(85.32239);
//   // const [lat, setLat] = useState(27.677106);
//   // const [zoomLevel, setZoomLevel] = useState(14);
//   const mapRef = useRef(null);
//   const mapStyleUrl = `https://map-init.gallimap.com/styles/light/style.json?accessToken=${conf.mapToken}`;

//   useEffect(() => {
//     console.log("Longitude:", lng, "Latitude:", lat);
//   }, [lng, lat]);

//   return (
//     <div>
//       <Map
//         ref={mapRef}
//         mapLib={maplibregl}
//         initialViewState={{
//           longitude: 85.32787321096492,
//           latitude: 27.68798323251299,
//           // zoom: zoomLevel,
//           zoom: 14,
//         }}
//         style={{ width: "90vh", minHeight: "80vh" }}
//         mapStyle={mapStyleUrl}
//         attributionControl={false}
//       >
//         {/* {lat && lng ? ( */}

//         <Marker
//           longitude={85.31894588492833}
//           latitude={27.69260397685197}
//           anchor="bottom"
//         >
//           <img
//             src="../assets/images/pin.png"
//             alt="marker"
//             style={{ height: "40px" }}
//           />
//         </Marker>

//         {/* ) : (
//           ""
//         )} */}
//       </Map>
//     </div>
//   );
// };

// export default Minimizedmap;
