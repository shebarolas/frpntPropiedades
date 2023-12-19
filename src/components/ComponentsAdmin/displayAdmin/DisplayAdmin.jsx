import React from 'react'
import "./displayAdmin.css";
import { EditProp } from '../editProp/EditProp';
import { DeleteApartment } from '../deleteAparment/DeleteApartment';
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import { Image } from 'antd';
import { Carousel } from 'antd';

export const DisplayAdmin = ({ data, setLoad }) => {
  const { photos } = data;
  console.log(data);
  return (
    <div className='displayAdmin'>
      <div className="displayWrap">
        <div className="dWrapTitle">
          <div className="dImages">
            <Carousel autoplay className='borderr'>
             {
                photos.map((photo, i) => (
                  <Image
                    height={320}
                    width={400}
                    style={{ borderRadius: '8px' }}
                    src={photo} key={i} className='imgs'
                  />
                ))
              } 
            </Carousel>
          </div>
          <div className="dTitles">
            <h1 className='dTitle'>{data.nombre}</h1>
            <div className="disLocation">
              <IoLocationOutline />
              <span>{data.direccion}, {data.ciudad}</span>
            </div>
            <div className="disDesc">
              <MdOutlinePriceChange />
              <span>{data.valor}</span>
            </div>

          </div>
        </div>
        <div className="dBtns">
          <EditProp setLoad={setLoad} data={data} />
          <DeleteApartment setLoad={setLoad} data={data} />
        </div>
      </div>
    </div>
  )
}
