import "./navbar.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/session-slice";
import { MdOutlineAddHomeWork } from "react-icons/md";
import Dropdown from "../ui/Dropdown";

const NavBar = () => {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex justify-center bg-primary">
      <div className="max-w-7xl w-full h-20 flex justify-between items-center">
        <Link to={"/"} className="decoration">
          <h1 className="text-white font-bold uppercase">Arriendo</h1>
        </Link>
        {user && !user.isAdmin ? (
          <Dropdown />
        ) : user?.isAdmin ? (
          <div className="navBu">
            <span className="navText">
              {user.name} {user.lastname}
            </span>
            <Link to={"/admin"}>
              <Button>Administracion</Button>
            </Link>
            <Button onClick={logout}>Salir</Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to={"/login"} className="text-white text-sm">
              Iniciar Sessión
            </Link>
            <Link to={"/register"} className="text-white text-sm">
              Crea tu cuenta
            </Link>
            <Link
              to={"/register"}
              className="text-blac bg-white rounded-md text-sm py-2 px-4 flex items-center gap-1"
            >
              <MdOutlineAddHomeWork />
              Publica tu propiedad
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
