
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routerBasic from './routes/routeBasic';
import routerAdmin from './routes/routeAdmin';
import { useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {loadSession} from './redux/slices/session-slice';
import { useEffect } from 'react';


function App() {

  const {user, loading} = useSelector(state => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(loadSession());

  }, [dispatch])

  if (loading) {
    return <h1>Cargando...</h1>
  }
  if(!loading && user && user.isAdmin){
      return <RouterProvider router={routerAdmin}/>
  }

  return (
    <>
      <RouterProvider router={routerBasic}/>
    </>
  )
}

export default App
