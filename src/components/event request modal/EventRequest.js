import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { formatTime } from "../../utils/dateTimeConverter";
import conf from "../../conf/conf";
import Minimizedmap from "../Minimizedmap";
import PanoromicImage from "../PanoromicImage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};

export default function EventRequest({ onCloseClick, row, triggerRefresh }) {
  const [socialMedia, setSocialMedia] = useState({
    facebook: "-",
    website: "-",
    instagram: "-",
    tiktok: "-",
  });

  const [panoromicImageLoaded, setPanoromicImageLoaded] = useState(true);

  useEffect(() => {
    let overallDatas = {};

    if (row.organizer?.website) {
      overallDatas.website = row.organizer?.website;
    }
    if (row.organizer?.facebook) {
      overallDatas.facebook = row.organizer?.facebook;
    }
    if (row.organizer?.tiktok) {
      overallDatas.tiktok = row.organizer?.tiktok;
    }
    if (row.organizer?.instagram) {
      overallDatas.instagram = row.organizer?.instagram;
    }

    if (row.organizer?.socialHandles) {
      const allSocialHandles = row.organizer?.socialHandles;
      let socialMediaArray = allSocialHandles.split(",");
      for (let i = 0; i < socialMediaArray.length; i++) {
        let mediaData = socialMediaArray[i];
        let webSite = socialMediaArray[i].split("website:");
        let facebook = socialMediaArray[i].split("facebook:");
        let instagram = socialMediaArray[i].split("instagram:");
        let tiktok = socialMediaArray[i].split("tiktok:");
        if (webSite.length > 1) {
          overallDatas.website =
            webSite[1].toString().trim() == ""
              ? "-"
              : webSite[1].toString().trim();
        }
        if (facebook.length > 1) {
          overallDatas.facebook =
            facebook[1].toString().trim() == ""
              ? "-"
              : facebook[1].toString().trim();
        }
        if (instagram.length > 1) {
          overallDatas.instagram =
            instagram[1].toString().trim() == ""
              ? "-"
              : instagram[1].toString().trim();
        }
        if (tiktok.length > 1) {
          overallDatas.tiktok =
            tiktok[1].toString().trim() == ""
              ? "-"
              : tiktok[1].toString().trim();
        }
      }
    }
    setSocialMedia(overallDatas);
  }, []);

  /* function getSocialMediaHandle(row, handleName) {
    // let socialMediaHandleArray = row.organizer.socialHandles.split(",");
    if (row.website) {
      if (row.website == null) {
        return;
      } else if (row.website && handleName == "website") {
        return row.website;
      }
    } else if (row.socialHandles) {
      let socialMediaHandleArray = row.socialHandles.split(",");
      // console.log("$$$$$$$", socialMediaHandleArray.length);

      if (socialMediaHandleArray.length == 1 && handleName == "website") {
        return row.socialHandles;
      } else {
        // let socialMediaHandleArray = row.socialHandles.split(",");

        const handle = socialMediaHandleArray.find((social) =>
          social.trim().startsWith(`${handleName}:`)
        );
        return handle ? handle.split(":")[1].trim() : null;
      }
    }
  } */

  const [open, setOpen] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openMap, setOpenMap] = useState(false);
  const [bannerImage, setBannerImage] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleMapOpen = () => {
    // setOpenEvent(false)
    setOpenMap(true);
  };
  const handleMapClose = () => setOpenMap(false);

  const handleOpenEvent = (image) => {
    setOpenEvent(true);
    setSelectedImage(image);
  };
  const handleCloseEvent = () => {
    setOpenEvent(false);
    setSelectedImage(null);
  };

  /* const bannerImage = row.bannerImage
    ? row.bannerImage
    : row.image
    ? row.image
    : ""; */

  useEffect(() => {
    const image = row.bannerImage
      ? row.bannerImage
      : row.image
      ? row.image
      : "";

    setBannerImage(image);
  }, [row]);

  const token = sessionStorage.getItem("token");

  const handleApproveReject = async (approvalStatus) => {
    try {
      const response = await fetch(`${conf.apiUrl}/normal-events/${row._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: `${approvalStatus}`,
        }),
      });

      if (response.ok) {
        console.log("response is successfully Patched");
        triggerRefresh();
      } else {
        console.log("response is NOT OK. Error to update data");
      }
    } catch (error) {
      console.log("Failed to update the data ", error);
    }

    onCloseClick(false);
  };

  function formatUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url;
    }
    return url;
  }

  return (
    <div className="h-screen w-[572px] bg-white pl-4 overflow-auto ">
      <div className="bg-[#F6F5F5]  flex justify-between items-center h-14 ml-[-16px]">
        <div className="flex items-center">
          <h1 className="text-lg font-bold pl-4">{row.name}</h1>
          <div className="ml-2">
            <Button
              variant="contained"
              sx={{
                display: row.status === "approved" ? "block" : "none",
                bgcolor: "#D0F5E1",
                color: "#27BE69",
                width: 91,
                fontSize: 14,
                "& .MuiSvgIcon-root": { color: "white", mr: 1, width: 16 },
                textTransform: "none",
              }}
              marginleft={8}
            >
              Approved
            </Button>
          </div>
          <div className="ml-2">
            <Button
              variant="contained"
              sx={{
                display: row.status === "rejected" ? "block" : "none",
                bgcolor: "#FFE2E3",
                color: "#F2415A",
                width: 91,
                fontSize: 14,
                "& .MuiSvgIcon-root": { color: "white", mr: 1, width: 16 },
                textTransform: "none",
              }}
              marginleft={8}
            >
              Rejected
            </Button>
          </div>
        </div>
        <IconButton onClick={() => onCloseClick(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <p>Verification</p>
        {/* <Button variant='contained' color='#295BFF'> */}
        <div
          className={`space-x-2 ${row.status === "new" ? "block" : "hidden"}`}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#295BFF",
              color: "white",
              width: 105,
              fontSize: 14,
              "& .MuiSvgIcon-root": { color: "white", mr: 1, width: 16 },
              textTransform: "none",
            }}
            marginleft={8}
            onClick={() => handleApproveReject("approved")}
          >
            <DoneIcon />
            Approve
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#F2392E",
              color: "white",
              width: 105,
              fontSize: 14,
              "& .MuiSvgIcon-root": { color: "white", mr: 1, width: 16 },
              textTransform: "none",
            }}
            onClick={() => handleApproveReject("rejected")}
          >
            <CloseIcon />
            Reject
          </Button>
        </div>
        {/* <Minimizedmap /> */}

        {/* details part */}
        <div className="mt-4 grid grid-cols-2 gap-y-4">
          <div className="flex flex-col gap-y-1">
            <p>Event Name:</p>
            <p className="font-medium">{row.name}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Location:</p>
            <p className="font-medium">{row.address}</p>
            <p
              className="underline underline-offset-4 text-blue-500  cursor-pointer hover:text-blue-700"
              onClick={handleMapOpen}
            >
              view on Map
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Start Date:</p>
            <p className="font-medium">{formatTime(row.startDate)}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>End date:</p>
            <p className="font-medium">{formatTime(row.endDate)}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Event type:</p>
            <p className="font-medium">
              {row.category.name} - {row.subCategory}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Event Pricing:</p>
            <p className="font-medium">
              {row.price === 0 ? "Free" : `Rs ${row.price}`}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Parking</p>
            <p className="font-medium">
              {row.parking === true ? "Available" : "No"}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Phone Number:</p>
            <p className="font-medium">{row.organizer.phone}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Email:</p>
            <p className="font-medium">{row.organizer.email}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Organizer Name:</p>
            <p className="font-medium">{row.organizer.name}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Requested Date:</p>
            <p className="font-medium">
              {formatTime(row.publishDate)} -{" "}
              {formatTime(row.publishDate, "time")}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h2>Description</h2>
          <p className="mt-2 font-medium">{row.description}</p>
        </div>
        {/* Call to Action */}

        {row.callToAction && (
          <div className="mt-4">
            <h2 className="mb-3">Click to action</h2>
            <a
              href={formatUrl(row.clickLink)}
              target="_blank"
              className=" font-medium bg-[#af3d23] text-white p-2 px-3 rounded min-w-20 text-center"
            >
              {row.callToAction}
            </a>
          </div>
        )}

        {/* Social Media */}
        <div className="mt-4">
          <h2 className="border-b font-medium">Social Media</h2>
          <div className="mt-3 grid grid-cols-2 gap-y-4">
            <div className="flex flex-col gap-y-2">
              <p>Website</p>
              <p className="font-medium">
                {/* {row.organizer.website
                  ? row.organizer.website
                  : getSocialMediaHandle(row.organizer, "website")}
                {row.organizer.website} */}
                {/* {getSocialMediaHandle(row.organizer, "website")} */}
                <a
                  href={formatUrl(socialMedia.website)}
                  target="_blank"
                  className="hover:text-blue-700"
                >
                  {socialMedia.website}
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Facebook</p>
              <p className="font-medium">
                {/* {getSocialMediaHandle(row.organizer, "facebook")} */}
                <a
                  href={formatUrl(socialMedia.facebook)}
                  target="_blank"
                  className="hover:text-blue-700"
                >
                  {socialMedia.facebook}
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Instagram</p>
              <p className="font-medium">
                {/* {getSocialMediaHandle(row.organizer, "instagram")} */}
                <a
                  href={formatUrl(socialMedia.instagram)}
                  target="_blank"
                  className="hover:text-blue-700"
                >
                  {socialMedia.instagram}
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Tiktok</p>
              <p className="font-medium">
                {/* {getSocialMediaHandle(row.organizer, "tiktok")} */}
                <a
                  href={formatUrl(socialMedia.tiktok)}
                  target="_blank"
                  className="hover:text-blue-700"
                >
                  {socialMedia.tiktok}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Event Banner */}
        <div className="mt-4 mb-8 ">
          <h2 className="border-b font-medium">Event Banner</h2>
          <div
            className={`flex items-center ${bannerImage ? "space-x-4" : ""}`}
          >
            <div>
              {bannerImage && (
                <img
                  onClick={handleOpen}
                  className="w-36 h-32 rounded mt-3 object-cover"
                  src={`https://assets-dev.gallimap.com${bannerImage}`}
                  alt=""
                />
              )}
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <img
                    onClick={handleOpen}
                    className="w-fit h-screen rounded mt-3"
                    src={`https://assets-dev.gallimap.com${bannerImage}`}
                    alt=""
                  />
                </Box>
              </Modal>
            </div>
            {panoromicImageLoaded && (
              <div className="w-36 h-32 mb-1">
                <PanoromicImage
                  latitude={row.location.coordinates[0]}
                  longitude={row.location.coordinates[1]}
                  onLoad={(newValue) => setPanoromicImageLoaded(newValue)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Event Image */}
        <div className="mt-4 mb-8">
          <h2 className="border-b font-medium">Event Image</h2>
          <div className="flex flex-wrap ">
            {row.images.map((image, index) => (
              <img
                key={index}
                className="w-36 h-32 ml-3 rounded mt-3 object-cover"
                src={`https://assets-dev.gallimap.com${image}`}
                alt=""
                onClick={() => handleOpenEvent(image)}
              />
            ))}
            <Modal open={openEvent} onClose={handleCloseEvent}>
              <Box sx={style}>
                <img
                  className="w-fit h-screen rounded mt-3 object-contain"
                  src={`https://assets-dev.gallimap.com${selectedImage}`}
                  alt=""
                />
              </Box>
            </Modal>
          </div>
        </div>
        {/* Map */}
        <Modal open={openMap} onClose={handleMapClose}>
          <Box sx={{ ...style, width: "60%" }}>
            <div className="w-auto h-screen    flex items-center justify-center ">
              <Minimizedmap
                lng={row.location.coordinates[1]}
                lat={row.location.coordinates[0]}
              />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
