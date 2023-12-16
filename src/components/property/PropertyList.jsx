import "./propertylist.css";
import useFetch from "../Hooks/useFecth";
import Spinner from "../ui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTypo3 } from "@fortawesome/free-brands-svg-icons";

export const PropertyList = () => {
  const { data, loading } = useFetch(
    "https://back-arriendos.onrender.com/api/v1/hotel/countType"
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
          <FontAwesomeIcon icon={faTypo3} className="text-white" size="sm" />
        </div>
        <h2 className="font-semibold">Tipo de propiedad</h2>
      </div>

      {/* data */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((data, index) => (
          <div
            key={index}
            className="flex justify-center h-20 items-center bg-primary text-white rounded-lg flex-col"
          >
            <h3 className="text-lg font-semibold">{data.type}</h3>
            <span className="text-xs">
              <FontAwesomeIcon icon={faTypo3} size="sm" className="mr-1" />
              {data.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
