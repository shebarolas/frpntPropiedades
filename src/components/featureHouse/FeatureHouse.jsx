import "./featureHouse.css";
import useFetch from "../Hooks/useFecth";
import Spinner from "../ui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseFire, faLocation } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../config/constants";

export const FeatureHouse = () => {
  const { data, loading } = useFetch(`${API_URL}/hotel/getAll?featured=true`);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-1">
        <div className="bg-primary flex items-center justify-center p-1 rounded-md">
          <FontAwesomeIcon
            icon={faHouseFire}
            className="text-white"
            size="sm"
          />
        </div>
        <h2 className="font-semibold text-2xl">Agregagas Recientemente</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((data) => (
          <div key={data._id} className="relative h-72">
            <img
              src={data.photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute left-0 bottom-0 w-full h-full dark-gradient p-4 flex flex-col justify-end">
              <div className="flex justify-between items-center">
                <p className="text-white text-xs space-x-1">
                  <FontAwesomeIcon icon={faLocation} className="text-white" />
                  <span>Ciudad: {data.city}</span>
                </p>
                <span className="text-white text-xs">
                  {data.user.name} {data.user.lastname}
                </span>
              </div>
              <h4 className="text-white text-xl font-bold">{data.name}</h4>

              <span className="text-white font-bold">${data.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
