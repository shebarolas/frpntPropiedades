import React from 'react'
import './propertylist.css';
import useFetch from '../Hooks/useFecth';
import { API_URL } from '../../config/constants';

export const PropertyList = () => {
    const { data, loading, error } = useFetch(`${API_URL}/hotel/countType`);
    console.log(data);
    return (
        <div className="propertylist">
            {
                loading ? ("Loading please wait........") : (<>

                    {
                        data.map(data => (
                            <div className="pListItem" key={data}>
                                <img src="https://images.adsttc.com/media/images/623b/95b5/d395/0701/660b/a014/slideshow/at-d-ambrosio-02.jpg?1648072164" alt="casa image" />
                                <div className="pListTitles">
                                    <h1>{data.type}</h1>
                                    <h2>{data.count}</h2>
                                </div>
                            </div>
                        ))
                    }


                </>)
            }
        </div>
    )
}
