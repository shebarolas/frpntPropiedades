import React, { useState } from 'react'
import './hotel.css';
import { useLocation } from 'react-router-dom';
import { SearchItems } from '../../components/searchItems/SearchItems';
import useFetch from '../../components/Hooks/useFecth';
import { API_URL } from '../../config/constants';

export const Hotel = () => {
    const {state} = useLocation();
    const [location, setLocation] = useState(state.value);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const {data, loading, error, reFetch} = useFetch(`${API_URL}/hotel/getAll?featured=true&city=${location}&min=${min || 0}&max=${max || 10000000000000}`);
    console.log(data);

    const handleClick = () => {
        reFetch();
    }

    return (
        <div className="hotel">
            <div className="hotelListCont">
                <div className="hotelListWrapper">
                    <div className="hotelListSearch">
                        <h1 className="hotelListTitle">Search</h1>
                        <div className="hotelListItems">
                            <span>Destination:</span>
                            <input type="text" placeholder="Destination" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        </div>
                        <div className="hotelListItems">
                            <span>Min Price:  </span>
                            <input type="number" onChange={e => setMin(e.target.value)} placeholder="Mine Price" />
                        </div>
                        <div className="hotelListItems">
                            <span>Max Price:</span>
                            <input type="number" onChange={e => setMax(e.target.value)} placeholder="Max Price" />
                        </div>
                        {/* <div className="hotelListItems">
                            <span>Bedroom </span>
                            <input type="text" placeholder="Bedroom" />
                        </div> */}
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="hotelListResult">
                        {
                            loading ? "Loading..." : <>
                                {
                                    data.map(data => (
                                        <SearchItems data={data} key={data._id}/>
                                    ))
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
