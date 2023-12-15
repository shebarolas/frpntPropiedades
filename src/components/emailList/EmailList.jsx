import React from 'react'
import './emailList.css';

export const EmailList = () => {
    return (
        <div className='emailList'>
            <h1 className="emailListTitle">Quieres recibir notificaciones?</h1>
            <span className="emailListDesc">Semanalmente, vas a recibir anuncios    </span>
            <div className="emialListInputs">
                <input type="text" placeholder='your@email.com'/>
                <button>Suscribe</button>
            </div>
        </div>
    )
}
