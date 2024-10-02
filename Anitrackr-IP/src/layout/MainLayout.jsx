import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="content-area">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
