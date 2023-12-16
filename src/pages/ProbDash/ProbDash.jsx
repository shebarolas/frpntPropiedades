import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';

import { useSelector } from 'react-redux';
import { instance } from '../../config/axios';

export const ProbDash = () => {
    const { user } = useSelector((state) => state.session);
    const [datas, setDatas] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const res = async () => {
        try {
            setLoading(true);
            const datass = await instance.get(`/hotel/getIdAdmin/${user._id}`);
            const { data } = datass;
            const tipos = data.map(item => item.type);
            const transformedData = tipos.reduce((acc, val) => {
                console.log(acc);
                const existingItem = acc.find(item => item.name === val);
                if (existingItem) {
                    existingItem.value += 1;
                } else {
                    acc.push({ name: val, value: 1 });
                }
                return acc;
            }, []);

            // Almacenar los datos transformados en el estado

            setDataArray(transformedData);

            setDatas(data);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        res();
        return () => {
            setLoad(false);
        }
    }, [load])

    const colors = ['#8884d8', '#82ca9d'];


    return (
        <>
            <div className="lineChart">
                <LineChart
                    width={500}
                    height={300}
                    data={datas}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
            <div className="barChart">
                <BarChart
                    width={500}
                    height={300}
                    data={dataArray}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value"  fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />


                </BarChart>
            </div>
        </>
    )
}
