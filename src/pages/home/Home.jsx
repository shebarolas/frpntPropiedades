import React from 'react'
import { Feature } from '../../components/feature/Feature'
import './home.css';
import { PropertyList } from '../../components/property/PropertyList';
import { FeatureHouse } from '../../components/featureHouse/FeatureHouse';
import { EmailList } from '../../components/emailList/EmailList';

export const Home = () => {
  return (
   <div className="home">
      <Feature/>
      <h1 className="homeTitle">
        Propiedad por tipo
      </h1>
      <PropertyList/>
      <h1 className="homeTitle">Las que puedes ver</h1>
      <FeatureHouse/>
      <EmailList/>
      
   </div>
  )
}
