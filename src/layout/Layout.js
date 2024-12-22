import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="w-60">
        <Sidebar />
      </div>
      <div className="flex-auto w-full">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
