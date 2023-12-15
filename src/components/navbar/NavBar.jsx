import React from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/slices/session-slice';

export const NavBar = () => {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());

  }

  console.log(user);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={'/'} className="decoration">
          <h1 className="logo">Arriendo</h1>
        </Link>
        {
          user && !user.isAdmin ? <>
            <div className="navBu">
              <span className='navText'>{user.name} {user.lastname}</span>
              <Link to={'/payment'}><Button>Membresia</Button></Link>
              <Button onClick={logout}>Salir</Button>
            </div>
          </> 
          : user?.isAdmin ? <div className="navBu">
              <span className='navText'>{user.name} {user.lastname}</span>
              <Link to={'/admin'}><Button>Administracion</Button></Link>
              <Button onClick={logout}>Salir</Button>
            </div> 
            :
            (<div className="navItems">
            <Link to={'/login'}><Button className="btns">Login</Button></Link>
            <Link to={'/register'}><Button className="btns">Register</Button></Link>
          </div>
          )
        }
      </div>
    </div>
  )
}
