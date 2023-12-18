import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HouseCard from "../../components/ui/HouseCard";
import Head from "../../components/ui/Head";
import Map from "../../components/ui/Map";
import Searchbar from "../../components/ui/Searchbar";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/", { replace: true });
    }
  }, [navigate, query]);

  return (
    <>
      <Head title={`Busqueda en ${query}`} />

      <div className="grid grid-cols-3 gap-4">
        {/* results */}
        <div className="px-10 py-6 flex flex-col gap-4">
          {/* bar */}
          <Searchbar />

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
            <span className="text-sm">0 lugares</span>
          </section>

          {/* data */}
          <section className="flex flex-col gap-4">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <HouseCard key={index} />
              ))}
          </section>
        </div>

        {/* maps */}
        <div className="col-span-2">
          <div className="h-screen sticky top-0 left-0">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
