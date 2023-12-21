import "./navbar.css";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../redux/slices/session-slice";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";

export const NavBar = () => {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
    window.location.href = "/";
  };

  return (
    <div className="navBar">
      <div className="contNav">
        <IoPersonCircleOutline className="icons" />
        <h1 className="titleNav navText">Bienvenido {user.name}</h1>
      </div>

      <div className="navMenu">
        <div className="dash">
          <AiOutlineDashboard className="icons" />
          <Link to={""}>
            <span className="navText">Dashboard</span>
          </Link>
        </div>
        <div className="dash">
          <IoHomeOutline className="icons" />
          <Link to={"propiedades"}>
            <span className="navText">Mis Propiedades</span>
          </Link>
        </div>
        <div className="dash">
          <FaPerson className="icons" />
          <Link to={"arrendatarios"}>
            <span className="navText">Mis Arrendatarios</span>
          </Link>
        </div>
      </div>
      <Button className="btnAd" onClick={logout}>
        Cerrar Sesion
      </Button>

      {/* <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      /> */}
      {/* 
      <Menu
        className="conteinerNav"
        theme={"light"}
        onClick={onClick}
        style={{
          width: 256,
          backgroundColor: "#6b9795"
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      /> */}
      {/* <h1 className='titleNav'>Bienvenido {user.username}</h1>
      <div className="conteinerNav">
        
        <Link to={'/admin'} className='linkNav'>Inicio</Link>
        <Link className='linkNav' to={'proiedades'}>Mis Propiedades</Link>
        <a href="" className='linkNav'>Mis Arrendatarios</a>
      </div> */}
    </div>
  );
};
