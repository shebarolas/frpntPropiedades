import { Link } from "react-router-dom";
import { Dropdown as DropdownAntd } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/session-slice";

import { CiUser } from "react-icons/ci";
// import { TiDocument } from "react-icons/ti";
import { MdCardMembership } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

export default function Dropdown() {
  const { user } = useSelector((state) => state.session);
  console.log(user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
  };

  const items = [
    {
      key: "2",
      label: (
        <Link to="/perfil" className="flex items-center gap-1">
          <CiUser />
          Perfil
        </Link>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <Link to="/agenda" className="flex items-center gap-1">
    //       <TiDocument />
    //       Mis horas
    //     </Link>
    //   ),
    // },
    {
      key: "3",
      label: (
        <Link to="/payment" className="flex items-center gap-1">
          <MdCardMembership />
          Pagar Membresia
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <button type="button" className="text-red-500" onClick={logout}>
          Cerrar Sesión
        </button>
      ),
    },
  ];

  const itemsAd = [
    {
      key: "1",
      label: (
        <Link to={"/admin"} className="flex items-center gap-1">
          <MdDashboard />
          Dashborad
        </Link>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <Link to="/agenda" className="flex items-center gap-1">
    //       <TiDocument />
    //       Mis horas
    //     </Link>
    //   ),
    // },
    {
      key: "4",
      label: (
        <button type="button" className="text-red-500" onClick={logout}>
          Cerrar Sesión
        </button>
      ),
    },
  ];



  return (
    <DropdownAntd
      menu={
         !user.isAdmin ? {
          items,} : {
          items: itemsAd,}
      }
      placement="bottomRight"
      arrow
    >
      <button
        type="button"
        className={`${
          location.pathname === "/" ? "text-white" : "text-black"
        } flex items-center gap-1 border border-gray-200 rounded-full pl-3 pr-2 py-1`}
      >
        <span className="text-sm">{`${user?.name} ${user?.lastname}`}</span>
        <div className="p-[2px] bg-black/5 rounded-full">
          <img
            alt="avatar"
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </button>
    </DropdownAntd>
  );
}
