import React from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar() {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/src/assets/images/galli-maps-logo.png"
            className="w-32"
            alt=""
          />
      <IconButton 
        aria-label="menu icon"
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
        <MenuIcon />
      </IconButton>
        </div>

        {/* <ul className="flex-1 px-3">{children}</ul> */}
        <div className="border-t flex p-3">
            <img 
            src="/src/assets/images/galli-maps-logo.png"
             alt=""
                className="w-1- h-10 rounded-md"
             />
             <div className={`flex justify-between items-center w-52 ml-3`}>
                <div className="leading-4">
                    <h4 className="font-semibold">Nirmal Maharjan</h4>
                    <span className="text-xs text-gray-600">nirmalmhjr@gmail.com</span>
                </div>
             </div>
        </div>
      </nav>
    </aside>
  );
}


export function SideBarItem ({icon, text, active, alert}){
    return(
        <li>
            {icon}
            <span>{text}</span>
        </li>
    )
}