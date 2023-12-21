import { LuHome } from "react-icons/lu";
import { MdLocationOn, MdOutlineBedroomParent } from "react-icons/md";
import PropiedadGallery from "./PropiedadGallery";
import { GrRestroom } from "react-icons/gr";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import Map from "../ui/Map";
import PropiedadAgendaCalendar from "./PropiedadAgendaCalendar";
// import { Tabs } from "antd";
import { useCallback, useEffect, useState } from "react";
import { instance } from "../../config/axios";
import Spinner from "../ui/Spinner";

export default function ModalAdminPropiedad({ propiedad }) {
  // const { data: agenda, loading } = useFetch(
  //   `${API_URL}/visitas/obtener/${propiedad._id}`
  // );
  const [agenda, setAgenda] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // const items = [
  //   {
  //     key: "1",
  //     label: "Detalles",
  //     children: <DetailTab propiedad={propiedad} />,
  //   },
  //   {
  //     key: "2",
  //     label: "Horas",
  //     children: <PropiedadAgendaCalendar agenda={agenda} />,
  //   },
  // ];

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await instance.get(`/visitas/obtener/${propiedad._id}`);
      if (response.status === 200) {
        setAgenda(response.data);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [propiedad]);

  useEffect(() => {
    fetchData();
  }, [fetchData, propiedad]);

  if (error)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>Error al cargar la publicación</p>
      </div>
    );

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="flex justify-center w-full">
      <div className="w-full py-8 flex flex-col gap-6">
        {/* info */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <LuHome />
              <h1 className="text-xl font-semibold">{propiedad?.nombre}</h1>
            </div>
            <p className="flex items-center gap-1 text-xs">
              <MdLocationOn />
              <span>
                {propiedad?.ciudad}, {propiedad?.direccion}
              </span>
            </p>
          </div>
          {/* gallery images */}
          <PropiedadGallery images={propiedad?.photos ?? []} />
        </div>
        {/* <Tabs defaultActiveKey="1" items={items} /> */}
        <DetailTab propiedad={propiedad} />
        <PropiedadAgendaCalendar agenda={agenda} propiedad={propiedad} />
      </div>
    </div>
  );
}

function DetailTab({ propiedad }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="w-full flex gap-4">
        {/* details */}
        <div className="text-black flex flex-col gap-4 grow">
          <div>
            <label className="text-sm font-semibold">Descripción</label>
            <p className="text-sm">{propiedad?.desc}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Caracteristicas</label>

            <div className="flex flex-col gap-1 text-gray-600">
              <div className="flex items-center gap-1">
                <GrRestroom />
                <p className="text-sm">
                  <span className="underline">Cantidad de baños:</span>{" "}
                  <span>{propiedad?.bano}</span>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineBedroomParent />
                <p className="text-sm">
                  <span className="underline">Cantidad de habitaciones:</span>{" "}
                  <span>{propiedad.habitaciones}</span>
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
      </section>

      {/* map */}
      <div className="h-[60vh] w-full">
        <Map />
      </div>
    </div>
  );
}
