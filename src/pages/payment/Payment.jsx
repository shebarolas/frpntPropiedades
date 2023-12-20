
import React from 'react'
import { instance } from '../../config/axios'
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { FaCashRegister } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import video from "../../assets/video/video.mp4";
import "./payment.css";
export const Payment = () => {


    const { user } = useSelector((state) => state.session);
    console.log(user);

    const onPyament = async () => {
        try {
            const res = await instance.post(`/pay/payment/${user._id}`);
            window.location.href = res.data.url;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='payment relative h-[100vh]'>
            <div className="payRight">
                <h1 className='payText'>Seleccionar tu plan de subscripción</h1>
                <Button onClick={onPyament}>Pagar</Button>
            </div>

            <div className="pWrapper">
                <div className="pWraTitle">
                    <h1 className='payText'>Beneficios de pagar la membresia</h1>
                    <div className="pWraBene">
                        <FaCashRegister className='icons'/>
                        <span className='pText'>Vas a poder registar tus propiedades</span>
                    </div>
                    <div className="pWraBene">
                        <MdApartment className='icons'/>
                        <span className='pText'>Podras administrar tus propiedades</span>
                    </div>
                    <div className="pWraBene">
                        <IoCreateOutline className='icons'/>
                        <span className='pText'>Podras crear 5 propiedades</span>
                    </div>
                    <div className="pWraBene">
                        <FaRegMoneyBillAlt className='icons'/>
                        <span className='pText'>Podras ver tus ganancias</span>
                    </div>
                    <div className="pWraBene">
                        <MdOutlinePayments className='icons' />
                        <span className='pText'>Podras recibir los pagos de tu arriendo (Futura Implementacion)</span>
                    </div>

                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <video
                    className="w-full h-full object-cover relative"
                    autoPlay
                    loop
                    muted
                >
                    <source src={video} type="video/mp4" />
                </video>

                <div className="absolute top-0 left-0 w-full h-full banner-gradient" />
            </div>
        </div>
    )
}
