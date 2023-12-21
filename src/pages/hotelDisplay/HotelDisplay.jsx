import "./hotelDisplay.css";
import { useParams } from "react-router-dom";
import useFetch from "../../components/Hooks/useFecth";
import { API_URL } from "../../config/constants";
import Spinner from "../../components/ui/Spinner";
import PropiedadGallery from "../../components/propiedad/PropiedadGallery";
import Head from "../../components/ui/Head";

import { LuHome } from "react-icons/lu";
import { MdLocationOn } from "react-icons/md";
import { GrRestroom } from "react-icons/gr";
import { MdOutlineBedroomParent } from "react-icons/md";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import Map from "../../components/ui/Map";

import PropiedadAgenda from "../../components/propiedad/PropiedadAgenda";
import { useSelector } from "react-redux";

export const HotelDisplay = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`${API_URL}/hotel/getId/${id}`);
  const { user } = useSelector((state) => state.session);
  const { data: schedules, loading: schedulesLoading } = useFetch(
    `${API_URL}/visitas/obtener/${id}`
  );

  if (loading && schedulesLoading)
    return (
      <>
        <Head title="Cargando" />

        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );

  if (!data) return <p>Error al cargar publicación</p>;

  return (
    <>
      <Head title={data?.nombre} />

      <div className="flex justify-center">
        <div className="max-w-7xl w-full py-8 flex flex-col gap-6">
          {/* info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <LuHome />
                <h1 className="text-xl font-semibold">{data?.nombre}</h1>
              </div>
              <p className="flex items-center gap-1 text-xs">
                <MdLocationOn />
                <span>
                  {data?.ciudad}, {data?.direccion}
                </span>
              </p>
            </div>
            {/* gallery images */}
            <PropiedadGallery images={data?.photos ?? []} />
          </div>

          {/* details */}
          <section className="w-full flex gap-4">
            {/* details */}
            <div className="text-black flex flex-col gap-4 grow">
              <div>
                <label className="text-sm font-semibold">Descripción</label>
                <p className="text-sm">{data?.desc}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Caracteristicas</label>

                <div className="flex flex-col gap-1 text-gray-600">
                  <div className="flex items-center gap-1">
                    <GrRestroom />
                    <p className="text-sm">
                      <span className="underline">Cantidad de baños:</span>{" "}
                      <span>{data?.bano}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdOutlineBedroomParent />
                    <p className="text-sm">
                      <span className="underline">
                        Cantidad de habitaciones:
                      </span>{" "}
                      <span>{data.habitaciones}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiFlowerTulipDuotone />
                    <p className="text-sm">
                      <span className="underline">Terraza incluida:</span>{" "}
                      <span>No</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* agendar */}
            {!data?.arrendada ? (
              <PropiedadAgenda schedules={schedules} propiedad={data} />
            ) : (
              <div>
                <div className="p-4 rounded-lg border border-gray-200 shadow-md flex items-center gap-1">
                  <CiWarning />
                  <h4 className="text-sm ">La propiedad ya esta arrendada</h4>
                </div>
              </div>
            )}
          </section>

          {/* map */}
          <div className="h-[60vh]">
            <Map />
          </div>

          {/* user */}
          <div></div>
        </div>
      </div>
    </>
  );
};
