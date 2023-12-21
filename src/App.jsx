import "./App.css";
import { RouterProvider } from "react-router-dom";
import routerBasic from "./routes/routeBasic";
import routerAdmin from "./routes/routeAdmin";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadSession } from "./redux/slices/session-slice";
import { useEffect } from "react";
import Loading from "./pages/loading/Loading";
import routerUser from "./routes/routeUser";

function App() {
  const { user, loading } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (!loading && user && user.isAdmin) {
    return <RouterProvider router={routerAdmin} />;
  }

  if (!loading && user && !user.isAdmin)
    return <RouterProvider router={routerUser} />;

  return (
    <>
      <RouterProvider router={routerBasic} />
    </>
  );
}

export default App;
