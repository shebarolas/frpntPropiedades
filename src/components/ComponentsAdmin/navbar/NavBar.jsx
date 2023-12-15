import "./navbar.css";
import React, { useState } from 'react';
import { HomeOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../../redux/slices/session-slice';
import { Link } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Inicio', 'sub1', <Link to={'/admin'}><DashboardOutlined /></Link>),
  getItem(' Mis Propiedades', 'sub2', <Link to={'/admin/proiedades'}><HomeOutlined /></Link>),
  getItem('Mis arrendatarios', 'sub4', <Link to={'/admin/arrendatarios'}> <SettingOutlined /> </Link>),
];


export const NavBar = () => {

  const { user } = useSelector(state => state.session);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
    window.location.href = "/";

  }


  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='navBar'>
      <div className="contNav">
        <h1 className='titleNav'>Bienvenido {user.name} {user.lastname}</h1>
        <Button className="btnAd" onClick={logout}>Cerrar Sesion</Button>
      </div>
      {/* <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      /> */}

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
      />
      {/* <h1 className='titleNav'>Bienvenido {user.username}</h1>
      <div className="conteinerNav">
        
        <Link to={'/admin'} className='linkNav'>Inicio</Link>
        <Link className='linkNav' to={'proiedades'}>Mis Propiedades</Link>
        <a href="" className='linkNav'>Mis Arrendatarios</a>
      </div> */}
    </div>
  )
}
