import React from 'react'
import './feature.css';
import useFetch from '../Hooks/useFecth';

export const Feature = () => {
  const { data, loading, error } = useFetch("https://back-arriendos.onrender.com/api/v1/hotel/countCity?cities=Temuco,Angol,Santiago");
  console.log(data);
  return (
    <div className="feature">
      {
        loading ? "Loading please wait......" :
          <><div className="featureItem">
            <img src="https://plus.unsplash.com/premium_photo-1683910665313-877b5dd42d4a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D"
              alt="house image" className='featureImg' />
            <div className="featureTitles">
              <h1>Temuco</h1>
              <h2>{data[0]} proiedades</h2>
            </div>
          </div>
            <div className="featureItem">
              <img src="https://plus.unsplash.com/premium_photo-1683910665313-877b5dd42d4a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt="house image" className='featureImg' />
              <div className="featureTitles">
                <h1>Angol</h1>
                <h2>{data[1]} propiedades</h2>
              </div>
            </div>
            <div className="featureItem">
              <img src="https://plus.unsplash.com/premium_photo-1683910665313-877b5dd42d4a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D"
                alt="house image" className='featureImg' />
              <div className="featureTitles">
                <h1>Santiago</h1>
                <h2>{data[2]} propiedades</h2>
              </div>
            </div>
          </>
      }
    </div>

  )
}
