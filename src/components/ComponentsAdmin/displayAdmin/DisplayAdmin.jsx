import React from 'react'
import "./displayAdmin.css";
import { EditProp } from '../editProp/EditProp';
import { DeleteApartment } from '../deleteAparment/DeleteApartment';


export const DisplayAdmin = ({ data, setLoad }) => {
  const { photos } = data;
  console.log(photos);
  return (
    <div className='displayAdmin'>
      <div className="displayWrap">
        <div className="dWrapTitle">
          <div className="dTitles">
            <h1 className='dTitle'>{data.name}</h1>
            <span>{data.adress}, {data.city}</span>
            <span>{data.desc}</span>
          </div>
          <div className="dImages">
            {
              photos.map((photo, i) => (
                <img className='imgs' src={photo} key={i} alt="" />
              ))
            }
          </div>
        </div>
        <div className="dBtns">
          <EditProp setLoad={setLoad} data={data}/>
          <DeleteApartment setLoad={setLoad} data={data} />
        </div>
      </div>
    </div>
  )
}
