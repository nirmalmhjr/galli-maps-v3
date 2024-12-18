import React from "react";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
// import eventImage from '../assets/images/event_banner.png';


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function EventRequest({onCloseClick}) {
  return (
    <div className="h-screen w-[572px] bg-white pl-4 overflow-auto ">
      <div className="bg-[#F6F5F5]  flex justify-between items-center h-14 ml-[-16px]">
        <div className="flex items-center">
          <h1 className="text-lg font-bold pl-4">Jyapu Diwas</h1>
          <div className="ml-2">
          <Button
            variant="contained"
            sx={{
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
        <IconButton onClick={()=> onCloseClick(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <p>Verification</p>
        {/* <Button variant='contained' color='#295BFF'> */}
        <div className="space-x-2">
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
            <p className="font-medium">Srijja Shrestha</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Location:</p>
            <p className="font-medium">Basantapur, Kathmandu</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Start Date:</p>
            <p className="font-medium">2081/08/30</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>End date:</p>
            <p className="font-medium">Srijja Shrestha</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Time</p>
            <p className="font-medium">11 AM</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Event type:</p>
            <p className="font-medium">cultural & Festival</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Event Pricing:</p>
            <p className="font-medium">Free</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Parking</p>
            <p className="font-medium">No</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Phone Number:</p>
            <p className="font-medium">9874000000</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Email:</p>
            <p className="font-medium">jyapusamaj@gmail.com</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Organizer Name:</p>
            <p className="font-medium">Ram Kaji Maharjan</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Requested Date:</p>
            <p className="font-medium">Admin</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h2>Description</h2>
          <p className="mt-2 font-medium">
            Yomari Punhi, a notable festival celebrated by the Newar community
            in Kathmandu, marks the end of the harvest season with offerings to
            Annapurna, the goddess of grains. This year, the festival is being
            observed on Sunday, Mangsir Shukla Purmina (full moon day of
            December).
          </p>
        </div>

        {/* Social Media */}
        <div className="mt-4">
          <h2 className="border-b font-medium">Social Media</h2>
          <div className="mt-3 grid grid-cols-2 gap-y-4">
            <div className="flex flex-col gap-y-2">
              <p>Website</p>
              <p className="font-medium">www.abc.com</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Facebook</p>
              <p className="font-medium">www.abc.com</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Instagram</p>
              <p className="font-medium">www.abc.com</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>Tiktok</p>
              <p className="font-medium">www.abc.com</p>
            </div>
          </div>
        </div>

        {/* Event Banner */}
        <div className="mt-4">
          <h2 className="border-b font-medium">Event Banner</h2>
          <img className="w-36 h-30 rounded mt-3" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGkFi-9BPXmZjWcfpCFAIWHrARYUcPadbWc3CEfaCfmEqnqvi5gIGfnCeA6cjaMcM_7KwY5XSU2ADz4Uz_hlSA-rar33qw8TIPEgErZg' alt="" />
        </div>

        {/* Event Image */}
        <div className="mt-4 mb-4">
          <h2 className="border-b font-medium">Event Banner</h2>
          <div className="flex  ">
            <img className="w-36 h-30 rounded mt-3" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBaIACKazHeV4CX3HI-Eqa2Nz2DBrTV5Rrq2FK8Lddnonr8RVnmx7VSkUuT3zpp30HbA&usqp=CAU' alt="" />
            <img className="w-36 h-30 ml-3 rounded mt-3" src='https://century.com.np/wp-content/uploads/2021/12/yomari.jpg' alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
