import React from 'react'
import './featureHouse.css';
import useFetch from '../Hooks/useFecth';
import { API_URL } from '../../config/constants';

export const FeatureHouse = () => {

    const { data, loading, error } = useFetch(`${API_URL}/hotel/getAll?featured=true`);
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
