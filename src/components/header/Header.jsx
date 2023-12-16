import { useState } from "react";
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBuilding, faBed } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import video from "../../assets/video/video.mp4";

const Header = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="relative h-[46vh]">
      <div className="flex justify-center items-center">
        <div className="max-w-7xl w-full flex flex-col gap-3 items-center">
          {/* btn */}
          <div className="flex items-center gap-4">
            <div className="py-4 px-10 flex items-center gap-2 bg-white rounded-lg">
              <FontAwesomeIcon
                icon={faHouse}
                className="text-black"
                size="sm"
              />
              <span className="text-black">Casas</span>
            </div>
            <div className="py-4 px-10 flex items-center gap-2 bg-white rounded-lg">
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-black"
                size="sm"
              />
              <span className="text-black">Departamentos</span>
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col items-center">
            <h1 className="headerTitle text-white text-5xl font-extrabold">
              Arrienda tu propiedad como un genio
            </h1>
            <p className="headerDesc text-white">
              Inicia sesion con tu cuenta para poder arrendar una propiedad.
            </p>
          </div>

          {/* search */}
          <div className="flex items-center max-w-2xl w-full h-12 gap-1">
            <div className="grow flex items-center h-full gap-2 rounded-lg px-4 bg-white">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="focus:outline-none w-full"
                onChange={(e) => setLocation(e.target.value)}
              />
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

            <Link
              to={"/hotel"}
              state={{ value: location }}
              className="h-full rounded-md"
            >
              <button className="bg-primary_dark text-white h-full px-4 rounded-md">
                Buscar
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <img
        alt="banner"
        src="https://cdn.pixabay.com/photo/2016/06/10/12/49/gallery-1448047_1280.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      /> */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video
          className="w-full h-full object-cover relative"
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 w-full h-full banner-gradient" />
      </div>
    </div>
  );
};

export default Header;
