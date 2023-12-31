import { createBrowserRouter } from "react-router-dom";
import { LayoutAdmin } from "../Layout/LayoutAdmin";
import { InicioAdmin } from "../pages/incioAdmin/InicioAdmin";
import { Propiedades } from "../pages/propiedades/Propiedades";
import { Arrendatario } from "../pages/misArrendatarios/Arrendatario";
import { Layout } from "../Layout/Layout";
import { Home } from "../pages/home/Home";
import { Hotel } from "../pages/hotel/Hotel";
import { HotelDisplay } from "../pages/hotelDisplay/HotelDisplay";
import { ProbDash } from "../pages/ProbDash/ProbDash";
import { Admin } from "../pages/admin/Admin";
import Notfound from "../pages/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hotel",
        element: <Hotel />,
      },
      {
        path: "/propiedad/:id",
        element: <HotelDisplay />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <InicioAdmin />,
      },
      {
        path: "propiedades",
        element: <Propiedades />,
      },
      {
        path: "arrendatarios",
        element: <Arrendatario />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/probDash",
    element: <ProbDash />,
  },
  {
    path: "/administrador",
    element: <Admin />,
  },
]);

export default router;
