import React, { useEffect, useState, useRef } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import conf from "../conf/conf";

// export default function PanoromicImage({ latitude, longitude}) {
export default function PanoromicImage({ latitude, longitude, onLoad }) {
  const [viewImage, setViewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const zoom = 20;

  // const panoViewUrl =
  //   "https://image-init.gallimap.com/api/v1/streetmarker/getnearestimage/";

  const removeData = () => {
    setViewImage(null);
  };

  useEffect(() => {
    const panoImage = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const geojson = await response.json();
        if (response && response.status === 200) {
          setViewImage(geojson.data);
          onLoad(true);
        } else if (response && response.status === 404) {
          console.log("failed to fetch panoimage");
          setViewImage(null); // Set to null or any default value
          onLoad(false);
        }
      } catch (error) {
        console.error("Failed to fetch panoimage", error);
        setViewImage(null); // Set to null or any default value
        onLoad(false);
      } finally {
        setLoading(false);
      }
    };

    const url = `${conf.panoViewUrl}/${latitude},${longitude}/${zoom}?accessToken=${conf.mapToken}`;
    panoImage(url);
  }, [latitude, longitude]);

  return (
    <div>
      {viewImage?.imgurl ? (
        <>
          <div
            className="w-full
            object-cover  h-[45%] border rounded-md mt-2 overflow-hidden"
          >
            <ReactPhotoSphereViewer
              src={viewImage.imgurl}
              // height={"18vh"}
              // width={"27vh"}
              height={"128px"}
              width={"144px"}
            ></ReactPhotoSphereViewer>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
