import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import user from "../assets/images/Ellipse 5.png";
import changePassword from "../assets/images/lock-password.png";
import logout from "../assets/images/logout.png";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [open, setOpen] = useState(false);
  const clickRef = useRef(null);
  const navigate = useNavigate();

  function handleClickOutside(event) {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (open) {
      //Add eventListener when component mounts
      // document.addEventListener("mouseover", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    }
    //remove the eventListner when component unmounts
    return () => {
      // document.removeEventListener("mouseover", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative" ref={clickRef}>
      <div className="flex items-center justify-between h-[68px] border-b w-full">
        <div className="w-32 h-7 flex  items-center ml-4 ">
          <IconButton>
            <MenuIcon />
          </IconButton>
          <p className="font-bold text-xl">Dashboard</p>
        </div>
        <div
          className="flex bg-[#F9E3DA] items-center justify-center rounded-lg w-28 h-10 gap-x-1 mr-4  cursor-pointer"
          // onClick={() => setOpen((prev) => !prev)}
          onClick={() => setOpen((prev) => !prev)}
        >
          <img className="w-6 h-6" src={user} alt="user picture" />
          <p className="text-sm ml-2">Admin</p>
          <KeyboardArrowDownIcon />
        </div>
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        } border rounded w-[140px]  absolute top-[62px] right-4 bg-white`}
      >
        <button className=" flex w-full h-7 items-center border-b cursor-pointer">
          <img
            className="ml-2 w-4 h-4 "
            src={changePassword}
            alt="change password"
          />
          <p className="text-xs ml-1 mr-2">Change Password</p>
        </button>
        <button
          className=" flex w-full h-7 items-center cursor-pointer"
          onClick={handleLogout}
        >
          <img className="ml-2 w-4 h-4 " src={logout} alt="logout" />
          <p className="text-xs ml-1">Logout</p>
        </button>
      </div>
    </div>
  );
}

export default Topbar;
