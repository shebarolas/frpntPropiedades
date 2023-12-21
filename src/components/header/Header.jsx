import { useState } from "react";
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBuilding, faBed } from "@fortawesome/free-solid-svg-icons";
import video from "../../assets/video/video.mp4";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="relative h-[60vh] flex items-center justify-center pb-20">
      <div className="flex justify-center items-center z-20">
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
          <form
            className="flex items-center max-w-2xl w-full h-12 gap-1"
            onSubmit={search}
          >
            <div className="grow flex items-center h-full gap-2 rounded-lg px-4 bg-white">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />

              <div className="w-full">
                <select
                  id="small"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 border-none focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                >
                  <option selected>Selecciona la ciudad</option>
                  <option value="Temuco">Temuco</option>
                  <option value="Angol">Angol</option>
                  <option value="Santiago">Santiago</option>
                </select>
              </div>
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

            <button
              className="h-full rounded-md bg-primary_dark text-white px-4"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
      {/* <img
        alt="banner"
        src="https://cdn.pixabay.com/photo/2016/06/10/12/49/gallery-1448047_1280.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      /> */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
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
