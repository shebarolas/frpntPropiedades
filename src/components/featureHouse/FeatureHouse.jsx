import React from 'react'
import './featureHouse.css';
import useFetch from '../Hooks/useFecth';

export const FeatureHouse = () => {

    const { data, loading, error } = useFetch("https://back-arriendos.onrender.com/api/v1/hotel/getAll?featured=true");
    console.log(data);
    return (
        <div className="featureHouse">
            {
                loading ? ("Loading please wait......") : (
                    <>
                        {
                            data.map(data => (
                                <div className="fpItem" key={data._id}>
                                    <img src={data.photos[0]}
                                        alt="" />
                                    <span className="fpName">{data.name}</span>
                                    <span className="fpCity">City: {data.city}</span>
                                    <span className="fpPrice">Price: {data.price}</span>
                                    <div className="fpRating">
                                        <span>Dueño: {data.user.name} {data.user.lastname}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </>

                )
            }

        </div>
    )
}
