import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { ACCESS_TOKEN } from '../../config/constants';
import { instance } from '../../config/axios';
import { setSession } from '../../redux/slices/session-slice';
import "./success.css"

export const Success = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.session);
    const dispatch = useDispatch();
   console.log(user._id);

    const onNavigate = async() => {
        console.log("hola")
        try {
          const res = await instance.put(`/user/updateToken/${user._id}`);
          console.log(res);
          const {access_token, users} = res.data;
          localStorage.setItem(ACCESS_TOKEN, access_token);
          dispatch(setSession(users));
          navigate("/");
        } catch (error) {
          console.log(error);
        }
        
    }

    useEffect(() => {

      onNavigate();
      navigate("/");
    }, [])
    

  return (
    <div className='success'>
        <div className="sWrapper">
          <div className="sWrapSuc">
            <h1>Felicidades por estar con nosotros C: </h1>
            <span>Por favor, has click en el boton para completar y regresar el home :C</span>
            <span>Con el dinero de la membresia, podremos mantener el servicio y agregar mas cosas a futuro</span>
          </div>
          {/* <Button className='btnSuc' onClick={onNavigate}>Volver al Home</Button> */}
        </div>
        
    </div>
  )
}
