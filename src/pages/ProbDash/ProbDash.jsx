import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';
import { useSelector } from 'react-redux';
import { instance } from '../../config/axios';
import './probDash.css';

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
            console.log(data);

            const tipos = data.map(item => item.tipo);
            console.log(tipos);
            const transformedData = tipos.reduce((acc, val) => {
                console.log(acc);
                const existingItem = acc.find(item => item.name === val);
                if (existingItem) {
                    existingItem.cantidad += 1;
                } else {
                    acc.push({ name: val, cantidad: 1 });
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

    const colors = ['#8884d8', '#82ca9d', '#acc95f'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div className='dash1'>
            <div className="lineChart">
            <h1 className='textLine'>Valor de Propiedades</h1>
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
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="valor" stroke="#6b9795" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
            <div className="barChart">
                <h1>Cantidad por tipo de Propiedad</h1>
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
                    <Bar dataKey="cantidad" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </div>
            <div className="pieChart">
                <h1>Porcentaje por tipo de propiedad</h1>
                <PieChart width={500} height={300}>
                    <Pie
                        data={dataArray}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="cantidad"
                    >
                        {dataArray.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    )
}
