// import Sidebar, { SideBarItem } from "./components/Sidebar";
// import Topbar from "./components/Topbar";
import Layout from "./layout/Layout";
import Event from "./pages/Event";
import './index.css'

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
  <Layout>
      <Event/>
  </Layout>
    </>
  );
}

export default App;
