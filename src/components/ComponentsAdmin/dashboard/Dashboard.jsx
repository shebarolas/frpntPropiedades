import React, { useEffect, useState } from 'react';
import { Progress, Space } from 'antd';
import { instance } from '../../../config/axios';
import { useSelector } from 'react-redux';
import { CardDashboard } from '../cardDashboard/CardDashboard';
import { Card, Col, Row, Statistic } from 'antd';
import './dashboard.css';
const { Meta } = Card;

export const Dashboard = () => {
    const [count, setCount] = useState([{
        total: 0,
        porcentaje: 0,
    }])
    const { user } = useSelector((state) => state.session);

    const onCount = async () => {
        try {
            const { data } = await instance.get(`/hotel/getByUserId/${user._id}`);
            setCount((prev) => ({
                ...prev,
                total: data.total,
                porcentaje: data.count
            }));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        onCount();
    }, []);

    return (

        <div className='dashboard'>
            <div className="dashAparment">
                <div className="porcArriendo">
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}>
                        <h1>Propiedades Sin Arrendar</h1>
                        <Space wrap>
                            <Progress type="dashboard" percent={count.porcentaje} />
                        </Space>
                    </Card>

                </div>
                <div className="porcTotal">
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}>
                        <h1>Total de Propiedades</h1>
                        <Space wrap>
                            <Progress type="dashboard" percent={100} format={() => `${count.total} Casas`} />
                        </Space>
                    </Card>
                </div>
                <div className="cardDash">
                    <CardDashboard />
                </div>
            </div>
        </div >
    )
}
