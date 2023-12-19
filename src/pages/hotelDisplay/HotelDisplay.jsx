import { Link, useNavigate } from "react-router-dom";
import "./hotelDisplay.css";
import { useLocation } from "react-router-dom";
import useFetch from "../../components/Hooks/useFecth";
import { useSelector } from "react-redux";
import { instance } from "../../config/axios";
import { API_URL } from "../../config/constants";
import Spinner from "../../components/ui/Spinner";
import PropiedadGallery from "../../components/propiedad/PropiedadGallery";
import Head from "../../components/ui/Head";

import { LuHome } from "react-icons/lu";
import { MdLocationOn } from "react-icons/md";
import { GrRestroom } from "react-icons/gr";
import { MdOutlineBedroomParent } from "react-icons/md";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import Map from "../../components/ui/Map";

export const HotelDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`${API_URL}/hotel/getId/${id}`);
  const { user } = useSelector((state) => state.session);

  console.log(data);

  const onArrendar = async (e) => {
    e.preventDefault(e);
    const userId = user._id;
    try {
      const res = await instance.post("/arrendar/agendar", { userId, id });
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <>
        <Head title="Cargando" />

        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );

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
            <PropiedadGallery images={data.photos} />
          </div>

          <section className="w-full flex gap-4">
            {/* details */}
            <div className="text-black flex flex-col gap-4 grow">
              <div>
                <label className="text-sm font-semibold">Descripción</label>
                <p className="text-sm">{data.desc}</p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Caracteristicas</label>

                <div className="flex flex-col gap-1 text-gray-600">
                  <div className="flex items-center gap-1">
                    <GrRestroom />
                    <p className="text-sm">
                      <span className="underline">Cantidad de baños:</span>{" "}
                      <span>{data.bano}</span>
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
            <div className="w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-md border border-slate-100">
                {/* precio */}

                {!user ? (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs">
                      Inicia Sesion para arrendar{" "}
                    </label>
                    <Link
                      to={"/login"}
                      className="text-sm bg-primary flex py-2 text-white justify-center rounded-md"
                    >
                      {" "}
                      Iniciar Sesión{" "}
                    </Link>
                  </div>
                ) : (
                  !user?.isAdmin && (
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        className="bg-primary_dark py-2 text-white rounded-lg"
                        onClick={onArrendar}
                      >
                        Agendar
                      </button>
                      <p className="text-xs font-light text-center">
                        No se hará ningún cargo por el momento
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          <div className="w-full h-[50vh] rounded-lg">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};
