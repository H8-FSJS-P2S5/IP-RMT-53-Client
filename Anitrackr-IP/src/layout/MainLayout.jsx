import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="content-area" style={{ paddingTop: '100px' }}> {/* Add padding for the navbar height */}
        <Outlet />
        <Chatbot/>
      </div>
    </>
  );
}

export default MainLayout;
