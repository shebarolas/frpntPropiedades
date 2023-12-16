import "./feature.css";
import useFetch from "../Hooks/useFecth";
import Spinner from "../ui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocation } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../config/constants";

const places = [
  {
    title: "Temuco",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Temuco_skyline_from_%C3%91ielol_Hill.jpg/800px-Temuco_skyline_from_%C3%91ielol_Hill.jpg",
  },
  {
    title: "Angol",
    image: "https://live.staticflickr.com/704/22576361126_7858b1a08e_b.jpg",
  },
  {
    title: "Santiago",
    image: "https://www.gochile.cl/fotos/full/2663-santiago.jpg",
  },
];

export const Feature = () => {
  const { data, loading } = useFetch(
    `${API_URL}/hotel/countCity?cities=Temuco,Angol,Santiago`
  );

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <div className="bg-primary flex items-center justify-center p-1 rounded-md">
          <FontAwesomeIcon icon={faLocation} className="text-white" size="sm" />
        </div>
        <h2 className="font-semibold">Lugares</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {places.map((item, index) => (
          <div key={index} className="h-40 relative w-full">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover rounded-lg"
            />
            <div className="absolute w-full h-full top-0 left-0 px-4 py-6 banner-gradient rounded-lg">
              <div className="flex flex-col justify-end h-full">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faLocation}
                    className="text-white"
                    size="sm"
                  />
                  <h4 className="text-white text-2xl uppercase font-extrabold">
                    {item.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="text-white"
                    size="sm"
                  />
                  <h2 className="text-white text-xs">
                    {data[index]} proiedades
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
