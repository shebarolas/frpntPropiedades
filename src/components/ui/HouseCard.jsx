import { useNavigate } from "react-router-dom";
import {
  calculateDistanceBetweenPoints,
  formatPrice,
} from "../../utils/methods";
import Tag from "./Tag";
import { LuMapPin } from "react-icons/lu";
import useGeoLocation from "../../hooks/useGeolocation";
import { useMemo } from "react";

export default function HouseCard({ property, onChangeLocation }) {
  const navigate = useNavigate();
  const { location } = useGeoLocation();

  const distance = useMemo(
    () =>
      calculateDistanceBetweenPoints(location, {
        latitude: Number(property?.lat),
        longitude: Number(property?.long),
      }),
    [property, location]
  );

  return (
    <div
      className="bg-white rounded-lg hover:cursor-pointer"
      onMouseEnter={() => {
        onChangeLocation({
          latitude: Number(property?.lat),
          longitude: Number(property?.long),
        });
      }}
      onClick={() => navigate(`/propiedad/${property?._id}`)}
    >
      {/* house image */}
      <div className="h-64 rounded-lg overflow-hidden">
        <img
          alt="image"
          src={property?.photos[0]}
          className="w-full h-full object-cover rounded-lg scale-100 transition-all duration-200 ease-out hover:scale-105"
        />
      </div>

      {/* house info */}
      <div className="py-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center text-xs m-0">
            <LuMapPin className="text-gray-400 w-4 h4" />
            {property?.ciudad}, {property?.direccion}
          </p>
          <Tag label={property?.tipo} />
        </div>
        <h4 className="text-black font-bold text-base">{property?.nombre}</h4>
        <p className="font-light text-sm text-gray-500">
          A {distance} kilometros de distancia
        </p>
        <p className="font-bold">
          ${formatPrice(property?.valor)} CLP{" "}
          <span className="font-light">x mes</span>
        </p>
      </div>
    </div>
  );
}
