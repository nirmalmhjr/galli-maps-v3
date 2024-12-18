import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import galliMapsLogo from "../assets/images/galli-maps-logo.png";
import location from "../assets/images/location.png";
import briefcase from "../assets/images/briefcase.png";
import department from "../assets/images/department.png";
import event from "../assets/images/event.png";

export default function Sidebar() {
  return (
    <aside className="h-screen">
      {/* <nav className="h-full flex flex-col bg-white border-r shadow-sm w-60"> */}
      <nav className="h-full flex flex-col bg-white border-r shadow-sm ">
        <div className="p-4 pb-2 flex items-center justify-center border-b h-[68px]">
          <img
            src={galliMapsLogo} 
            className="w-16 h-12  "
            alt="galli-maps-logo"
          />
        </div>
     

        <div className="flex flex-col items-center space-y-2">
          <div className="flex justify-start items-center mt-6 w-[218px]  h-12 rounded-lg">
            <img className="w-4 h-4  ml-8 mr-2" src={location} alt="" />
            <p>Add Place Request</p>
          </div>
          <div className="flex justify-start items-center w-[218px]  h-12 rounded-lg">
            <img className="w-4 h-4 ml-8 mr-2" src={briefcase} alt="" />
            <p>Add Business Requests</p>
          </div>
          <div className="flex justify-start items-center w-[218px]  h-12 rounded-lg">
            <img className="w-4 h-4 ml-8 mr-2" src={department} alt="" />
            <p>Add Department</p>
          </div>
          <div className="flex justify-start items-center bg-[#F9E3DA] w-[218px] h-12 rounded-lg">
            <img className="w-4 h-4 ml-8 mr-2 " src={event} alt="" />
            <p>Event</p>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SideBarItem({ icon, text, active, alert }) {
  return (
    <li>
      {icon}
      <span>{text}</span>
    </li>
  );
}
