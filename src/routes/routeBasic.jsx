import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Home } from "../pages/home/Home";
import { Hotel } from "../pages/hotel/Hotel";
import { HotelDisplay } from "../pages/hotelDisplay/HotelDisplay";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import { Payment } from "../pages/payment/Payment";
import { Success } from "../pages/success/Success";
import Search from "../pages/search/Search";

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
        path: "hotel",
        element: <Hotel />,
      },
      {
        path: "/Description/:id",
        element: <HotelDisplay />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
