import React, { useEffect, useState } from 'react'
import { instance } from '../../../config/axios';
import { useSelector } from 'react-redux';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const { Meta } = Card;
import './cardDashboard.css';

export const CardDashboard = () => {
    const { user } = useSelector((state) => state.session);
    const [total, setTotal] = useState([{
        gananciasPrv: 0,
        ganaciasReal: 0
    }]);

    const countMoney = async () => {
        try {
            const res = await instance.get(`/hotel/countMoney/${user._id}`);
            setTotal((prev) => ({
                ...prev,
                gananciasPrv: res.data,
            }));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        countMoney();
    }, []);

    const moneyHouse = async () => {
        try {
            const res = await instance.get(`/hotel/countMoneyHouse/${user._id}`);
            setTotal((prev) => ({
                ...prev,
                ganaciasReal: res.data
            }));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        moneyHouse();
    }, [])



    return (
        <div className='cardDashboard'>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                    
                >
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Ganancias Previstas"
                                value={total.gananciasPrv}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="$"
                                className='statics'
                            />
                        </Card>
                    </Col>
                    <Meta title="Ganancias Previstas" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 240,
                    }}
                >
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Ganancias Reales"
                                value={total.ganaciasReal}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="$"
                            />
                        </Card>
                    </Col>
                    <Meta title="Ganacias Reales"/>
                </Card>

           
        </div>
    )
}
