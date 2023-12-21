import { faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/constants";

export default function Searchbar({
  onChangeResults,
  onChangeLoading,
  query,
  onChangeQuery,
}) {
  const [value, setValue] = useState("");
  const search = async (e) => {
    e.preventDefault();

    if (query) {
      try {
        onChangeLoading(true);
        const { data } = await axios.get(
          `${API_URL}/hotel/getAll?visible=true&ciudad=${value}`
        );
        onChangeResults(data);
        onChangeQuery(value);
      } catch (e) {
        console.log(e);
      } finally {
        onChangeLoading(false);
      }
    }
  };

  return (
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
  );
}
