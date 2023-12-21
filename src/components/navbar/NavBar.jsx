import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineAddHomeWork } from "react-icons/md";
import logo from "../../assets/images/logo.png";

import Dropdown from "../ui/Dropdown";
import CustomLink from "../ui/CustomLink";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useSelector((state) => state.session);
  const location = useLocation();

  return (
    <div
      className={`flex justify-center ${
        location.pathname === "/"
          ? "bg-primary text-white shadow-none"
          : "bg-white text-black border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl w-full h-20 flex justify-between items-center">
        {/* logo */}
        <Link to={"/"} className="decoration flex items-center">
          <img alt="logo" src={logo} className="w-5 h-5 object-cover" />
          <h1 className="font-bold lowercase">ChilePlace</h1>
        </Link>

        {/* navegation */}
        <div className="flex items-center gap-10">
          <CustomLink url={"/"} label="Inicio" />
          {user ? (
            <Dropdown />
          ) : (
            <div className="flex items-center gap-4">
              <CustomLink url={"/login"} label="Iniciar Sesión" />
              <Link
                to={"/register"}
                className="text-blac bg-white text-black rounded-md text-sm py-2 px-4 flex items-center gap-1"
              >
                <MdOutlineAddHomeWork />
                Publica tu propiedad
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
