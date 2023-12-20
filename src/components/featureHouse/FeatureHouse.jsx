import "./featureHouse.css";
import useFetch from "../Hooks/useFecth";
import Spinner from "../ui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseFire, faLocation } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../config/constants";
import { useNavigate } from "react-router";

export const FeatureHouse = () => {
  const { data, loading } = useFetch(`${API_URL}/hotel/getAll?visible=true`);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );

  if (!data) return <></>;

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
        <h2 className="font-semibold text-2xl">Agregadas Recientemente</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((data, index) => (
          <div
            key={index}
            className="relative h-72 hover:cursor-pointer"
            onClick={() => navigate(`/propiedad/${data?._id}`)}
          >
            <img
              src={data?.photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute left-0 bottom-0 w-full h-full dark-gradient p-4 flex flex-col justify-end">
              <div className="flex justify-between items-center">
                <p className="text-white text-xs space-x-1">
                  <FontAwesomeIcon icon={faLocation} className="text-white" />
                  <span>Ciudad: {data?.ciudad}</span>
                </p>
                <span className="text-white text-xs">
                  {data?.user?.name} {data?.user?.lastname}
                </span>
              </div>
              <h4 className="text-white text-xl font-bold">{data?.nombre}</h4>

              <span className="text-white font-bold">${data?.valor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
