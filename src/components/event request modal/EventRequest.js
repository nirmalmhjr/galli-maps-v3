import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { formatTime } from "../../utils/dateTimeConverter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};

export default function EventRequest({ onCloseClick, row }) {
  const [socialMedia, setSocialMedia] = useState({
    facebook: "-",
    website: "-",
    instagram: "-",
    tiktok: "-",
  });

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEvent = (image) => {
    setOpenEvent(true);
    setSelectedImage(image);
  };
  const handleCloseEvent = () => {
    setOpenEvent(false);
    setSelectedImage(null);
  };

  const bannerImage = row.bannerImage
    ? row.bannerImage
    : row.image
    ? row.image
    : "";

  return (
    <div className="h-screen w-[572px] bg-white pl-4 overflow-auto ">
      <div className="bg-[#F6F5F5]  flex justify-between items-center h-14 ml-[-16px]">
        <div className="flex items-center">
          <h1 className="text-lg font-bold pl-4">Jyapu Diwas</h1>
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
          >
            <CloseIcon />
            Reject
          </Button>
        </div>

        {/* details part */}
        <div className="mt-4 grid grid-cols-2 gap-y-4">
          <div className="flex flex-col gap-y-1">
            <p>Event Name:</p>
            <p className="font-medium">{row.name}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Location:</p>
            <p className="font-medium">{row.address}</p>
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
            <p>Time</p>
            <p className="font-medium">{formatTime(row.publishDate, "time")}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Event type:</p>
            <p className="font-medium">{row.category.name}</p>
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
            <p className="font-medium">{formatTime(row.publishDate)}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h2>Description</h2>
          <p className="mt-2 font-medium">{row.description}</p>
        </div>

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
                {socialMedia.website}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Facebook</p>
              <p className="font-medium">
                {/* {getSocialMediaHandle(row.organizer, "facebook")} */}
                {socialMedia.facebook}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Instagram</p>
              <p className="font-medium">
                {/* {getSocialMediaHandle(row.organizer, "instagram")} */}
                {socialMedia.instagram}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Tiktok</p>
              <p className="font-medium">
                {/* {getSocialMediaHandle(row.organizer, "tiktok")} */}
                {socialMedia.tiktok}
              </p>
            </div>
          </div>
        </div>

        {/* Event Banner */}
        <div className="mt-4">
          <h2 className="border-b font-medium">Event Banner</h2>
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

        {/* Event Image */}
        <div className="mt-4 mb-4">
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
                  onClick={handleOpenEvent}
                  className="w-fit h-screen rounded mt-3"
                  src={`https://assets-dev.gallimap.com${selectedImage}`}
                  alt=""
                />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
