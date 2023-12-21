import { Outlet } from "react-router-dom";
import { NavBar } from "../components/ComponentsAdmin/navbar/NavBar";
import "./layoutAdmin.css";

export const LayoutAdmin = () => {
  return (
    <div className="layout">
      <NavBar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};
