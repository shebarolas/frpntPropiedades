import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HouseCard from "../../components/ui/HouseCard";
import Head from "../../components/ui/Head";
import Map from "../../components/ui/Map";
import Searchbar from "../../components/ui/Searchbar";
import useFetch from "../../components/Hooks/useFecth";
import { API_URL } from "../../config/constants";
import PropiedadSkeleton from "../../components/ui/PropiedadSkeleton";

export default function Search() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("q");
  const navigate = useNavigate();
  const [query, setQuery] = useState(type);
  const { data, loading, setData, setLoading } = useFetch(
    `${API_URL}/hotel/getAll?visible=true&ciudad=${query}`
  );
  // location para ver en el mapa al hacer hover sobre una propiedad
  const [location, setLocation] = useState({
    latitude: -38.750951,
    longitude: -72.605735,
  });

  useEffect(() => {
    if (!query) {
      navigate("/", { replace: true });
    }
  }, [navigate, query]);

  // cambia el estado de location
  const onChangeLocation = (value) => {
    setLocation(value);
  };

  const onChangeResults = (results) => {
    setData(results);
  };

  const onChangeLoading = (value) => {
    setLoading(value);
  };

  const onChangeQuery = (value) => {
    setQuery(value);
  };

  return (
    <>
      <Head title={`Busqueda en ${query}`} />

      <div className="grid grid-cols-3 gap-4">
        {/* results */}
        <div className="px-10 py-6 flex flex-col gap-4">
          {/* bar */}
          <Searchbar
            onChangeResults={onChangeResults}
            onChangeLoading={onChangeLoading}
            query={query}
            onChangeQuery={onChangeQuery}
          />

          {/* info */}
          <section>
            <div className="flex items-center gap-1">
              <div className="bg-primary flex items-center justify-center p-1 rounded-md">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="text-white"
                  size="sm"
                />
              </div>
              <h2 className="font-semibold">
                Resultados de busqueda en {query}
              </h2>
            </div>
            <span className="text-sm">
              {data?.length} {data?.length > 1 ? "lugares" : "lugar"}
            </span>
          </section>

          {/* data */}
          <section className="flex flex-col gap-4">
            {!loading
              ? data?.map((item, index) => (
                  <HouseCard
                    key={index}
                    property={item}
                    onChangeLocation={onChangeLocation}
                  />
                ))
              : Array(4)
                  .fill(0)
                  .map((_, index) => <PropiedadSkeleton key={index} />)}
          </section>
        </div>

        {/* maps */}
        <div className="col-span-2">
          <div className="h-screen sticky top-0 left-0">
            <Map
              latitude={location.latitude}
              longitude={location.longitude}
              rounded={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
