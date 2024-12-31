// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// export default function Layout({ children }) {
//   return (
//     <div className="flex">
//       <div className="w-60">
//         <Sidebar />
//       </div>
//       <div className="flex-auto w-full">
//         <Topbar />
//         <main>{children}</main>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

// export default function Layout({ children }) {
export default function Layout() {
  return (
    <div className=" flex flex-row h-screen overflow-hidden">
      {/* <div className="w-60 lg:w-1/6"> */}
      <div className="flex-shrink-0 w-60">
        <Sidebar />
      </div>
      <div className="flex-grow w-5/6 ">
        <Topbar />
        {/* <main >{children}</main> */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
