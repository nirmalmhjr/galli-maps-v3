// import Sidebar, { SideBarItem } from "./components/Sidebar";
// import Topbar from "./components/Topbar";
import Layout from "./layout/Layout";
import Event from "./pages/Event";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import AddPlaces from "./pages/AddPlaces";
import AddBusiness from "./pages/AddBusiness";
import AddDepartment from "./pages/AddDepartment"

function App() {
  return (
    <>
      {/* <main className="flex">
      <div className="w-60">
      <Sidebar />
      </div>
      <div className="flex-1">
        <Topbar />
      </div>
      
    </main> */}
      {/* <LoginPage /> */}
      {/* <Layout>
      <Event/>
  </Layout> */}

      {/* Protected Routes */}
      <Routes>
        {/* Public Routing */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={"admin"} />}>
          <Route element={<Layout />}>
            <Route path="/business" element={<AddBusiness />} />
            <Route path="/department" element={<AddDepartment />} />
            <Route path="/places" element={<AddPlaces />}/>
            <Route path="/event" element={<Event />} />
            {/* Add more protected routes here */}
          </Route>
        </Route>
        {/* for unAuthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
