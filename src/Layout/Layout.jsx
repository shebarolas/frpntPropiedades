import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

export const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
