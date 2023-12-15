import React, { useState } from 'react';
import { CreateAp } from '../../components/ComponentsAdmin/createaAperment/CreateAp';
import { VerAparment } from '../../components/ComponentsAdmin/verAparment/VerAparment';
import "./propiedades.css"

export const Propiedades = () => {
  return (
    <div className='verApp'>
      <VerAparment/>
    </div>
  )
}
