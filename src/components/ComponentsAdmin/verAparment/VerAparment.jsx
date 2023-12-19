import React, { useEffect, useState } from 'react'
import './verAparment.css'
import { instance } from '../../../config/axios';
import { useSelector } from 'react-redux';
import { SearchItems } from '../../searchItems/SearchItems';
import { DisplayAdmin } from '../displayAdmin/DisplayAdmin';
import { Skeleton } from 'antd';
import { CreateAp } from '../createaAperment/CreateAp';

export const VerAparment = () => {
  const { user } = useSelector((state) => state.session);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const res = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/hotel/getIdAdmin/${user._id}`);
      setData(data.data);
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




  return (
    <div className="ver">
      <CreateAp setLoad={setLoad} />
      <div className='verPropiedades'>
        <h1 className='verText'>Mis Propiedades</h1>
        <div className="verProps">
          {
            loading ? <Skeleton /> : <>
              {
                data.map(data => (
                  <DisplayAdmin setLoad={setLoad} data={data} key={data._id} />
                ))
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}
