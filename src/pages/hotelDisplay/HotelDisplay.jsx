import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import './hotelDisplay.css';
import { useLocation } from 'react-router-dom';
import useFetch from '../../components/Hooks/useFecth';
import { useSelector } from 'react-redux';
import { instance } from '../../config/axios';

export const HotelDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    console.log(id);
    const { data, loading, error } = useFetch(`https://back-arriendos.onrender.com/api/v1/hotel/getId/${id}`);
    console.log(data);
    const { user } = useSelector((state) => state.session)
    console.log(user);
    
    const onArrendar = async(e) => {
        e.preventDefault(e);
        const userId = user._id;
        console.log(userId);
        try {
            const res = await instance.post("/arrendar/agendar",{userId, id } );
            navigate("/");
            console.log(res);
        } catch (error) {
            
        }
    }
    
    return (
        <div className="hotelDisplay">
            {
                loading ? "Loading please wait.........." : <>
                    <div className="hotelWrapper">
                        <div className="hWrapperTitle">
                            <div className="hTitleLeft">
                                <h1 className="hotelTitle">
                                    {data.name}
                                </h1>
                                <div className="hotelAdress">
                                    <span>Direccion: {data.adress}, Ciudad: {data.city}</span>
                                </div>
                                <span className="hotelPrice">
                                    Valor: ${data.price}
                                </span>
                            </div>
                            <div className="hTitleRight">
                                {
                                    !user  ? <button disabled="false"> Iniciar Sesion para arrendar </button> : 
                                    user.isAdmin ? <span className='arrendador'>Usuario Arrendador no puede arrendar</span> : 
                                    <button onClick={onArrendar}> Arrendar </button>
                                }
                                
                            </div>

                        </div>
                        <div className="hotelGeneralP">
                            <div className="hotelImages">
                               
                                {data.photos?.map((img, index) => (
                                    <div className="hotelImgWrapper" key={index}>
                                        <img src={img} alt="hola" className='hotelImg' />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDescription">
                                <span className='size'>
                                    {data.desc}
                                </span>
                                <span className='size'>Cantidad de baños: {data.bano}</span>
                                <span className='size'>Cantidad de Habitaciones{data.habitaciones}</span>
                                <span className='size'>Terraza</span>
                            </div>
                        </div>

                    </div>
                </>
            }
        </div>
    )
}
