import React, { useContext, useState } from 'react'
import './header.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export const Header = () => {
    const [openDate, setOpenDate] = useState(false);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);


    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Casas</span>
                    </div>
                    <div className="headerListItemD">
                        <FontAwesomeIcon icon={faBuilding} />
                        <span>Departamentos</span>
                    </div>
                </div>
                <h1 className="headerTitle">Arrienda tu propiedad como un genio</h1>
                <p className="headerDesc">
                    Inicia sesion con tu cuenta para poder arrendar una propiedad.
                </p>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    {/* <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        {/* <span onClick={() => setOpenDate(!openDate)} className="headerSearchTime">{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date'
                        />} */}
                    
                    <Link to={'/hotel'} state={{value: location}}><button className="headerSearchBtn">Buscar</button></Link>
                </div>
            </div>
        </div>
    )
}
