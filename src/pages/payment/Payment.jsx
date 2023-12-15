
import React from 'react'
import { instance } from '../../config/axios'
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';;
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
        <div className='payment'>
            <div className="pWrapper">
                <div className="pWraTitle">
                    <h1>Beneficios de pagar la membresia</h1>
                    <div className="pWraBene">
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <span>Vas a poder registar tus propiedades</span>
                    </div>
                    <div className="pWraBene">
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <span>Podras administrar tus propiedades</span>
                    </div>
                    <div className="pWraBene">
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <span>Podras crear 5 propiedades</span>
                    </div>
                    <div className="pWraBene">
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <span>Prodas ver tus ganancias</span>
                    </div>
                    <div className="pWraBene">
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <span>Podras recibir los pagos de tu arriendo (Futura Implementacion)</span>
                    </div>

                </div>
                <Button onClick={onPyament}>Pagar</Button>
            </div>
        </div>
    )
}
