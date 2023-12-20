import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { LayoutAdmin } from "../Layout/LayoutAdmin";
import { InicioAdmin } from "../pages/incioAdmin/InicioAdmin";
import { Propiedades } from "../pages/propiedades/Propiedades";
import { Arrendatario } from "../pages/misArrendatarios/Arrendatario";
import { Layout } from "../Layout/Layout";
import { Home } from "../pages/home/Home";
import { Hotel } from "../pages/hotel/Hotel";
import { HotelDisplay } from "../pages/hotelDisplay/HotelDisplay";
import { Success } from "../pages/success/Success";
import { ProbDash } from "../pages/ProbDash/ProbDash";
import { Admin } from "../pages/admin/Admin";

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
        element: <div>Not Found</div>,
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
        path: "proiedades",
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
    element: <div>Not Found</div>,
  },
  {
    path: "/probDash",
    element: <ProbDash />,
  },
  {
    path: "/administrador",
    element: <Admin/>
  }
]);

export default router;
