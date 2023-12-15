import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { instance } from '../../config/axios';

export const ProbDash = () => {
    const { user } = useSelector((state) => state.session);
    const [datas, setDatas] = useState([]);
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const res = async () => {
        try {
          setLoading(true);
          const data = await instance.get(`/hotel/getIdAdmin/${user._id}`);
          console.log(data.data);
          setDatas(data.data);
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
    
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
     
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
    )
}
