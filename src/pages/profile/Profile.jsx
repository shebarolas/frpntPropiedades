import { useSelector } from "react-redux";
import Head from "../../components/ui/Head";

import { HiOutlineMail } from "react-icons/hi";
import { CiLocationOn, CiUser } from "react-icons/ci";
// import useFetch from "../../components/Hooks/useFecth";
// import { API_URL } from "../../config/constants";
import Spinner from "../../components/ui/Spinner";
import { Tabs, Timeline } from "antd";
import TimelineItem from "../../components/agenda/TimelineItem";
import { GrSchedulePlay } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { instance } from "../../config/axios";
import Tag from "../../components/ui/Tag";
import { LuHotel } from "react-icons/lu";
import moment from "moment";

export default function Profile() {
  const { user } = useSelector((state) => state.session);
  // const { data, loading } = useFetch(
  //   `${API_URL}/visitas/obtenerIdCliente/${user?._id}`
  // );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reloadHoras, setReloadHoras] = useState(false);
  const [isLoadingArriendos, setIsLoadingArriendos] = useState(false);
  const [dataArriendos, setDataArriendos] = useState([]);

  const fetchHoras = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await instance.get(
        `/visitas/obtenerIdCliente/${user?._id}`
      );

      setData(response.data);
    } catch (e) {
      console.log(e);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchArriendos = useCallback(async () => {
    try {
      setIsLoadingArriendos(true);
      const response = await instance.get(
        `/arrendar/obtenerArriendos/${user?._id}`
      );

      setDataArriendos(response.data);
    } catch (e) {
      console.log(e);
      setDataArriendos([]);
    } finally {
      setIsLoadingArriendos(false);
    }
  }, [user]);

  useEffect(() => {
    fetchHoras();

    return () => {
      setReloadHoras(false);
    };
  }, [fetchHoras, reloadHoras]);

  useEffect(() => {
    fetchArriendos();
  }, [fetchArriendos]);

  const items = [
    {
      key: "1",
      label: "Mis visitas",
      children: <VisitTab data={data} setReloadHoras={setReloadHoras} />,
    },
    {
      key: "2",
      label: "Mis Arriendos",
      children: <ArriendoTab data={dataArriendos} />,
    },
  ];

  if (isLoading && isLoadingArriendos)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <Head title="Perfil" />

      <div className="min-h-screen flex flex-col items-center">
        <div className="max-w-7xl w-full py-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-lg font-bold flex items-center gap-1">
              <CiUser />
              Perfil
            </h2>
            <div className="bg-white rounded-lg shadow border border-gray-100 p-6 flex items-center gap-3">
              <img
                alt="image"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                className="w-14 h-14 object-cover rounded-lg"
              />

              <div>
                <h4 className="text-lg font-medium">{`${user?.name} ${user?.lastname}`}</h4>
                <p className="text-sm font-light text-gray-500 flex items-center gap-1">
                  <HiOutlineMail />
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </>
  );
}

function VisitTab({ data, setReloadHoras }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-1">
        <GrSchedulePlay />
        Mis visitas
      </h2>
      {data ? (
        <div className="w-full">
          <Timeline
            items={data?.map((item, index) => {
              return {
                children: (
                  <TimelineItem
                    key={index}
                    agenda={item}
                    setReloadHoras={setReloadHoras}
                  />
                ),
              };
            })}
          />
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500">No existen visitas</p>
        </div>
      )}
    </div>
  );
}

function ArriendoTab({ data }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-1">
        <LuHotel />
        Mis Arriendos
      </h2>
      {data ? (
        <div className="w-full flex flex-col gap-4">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex gap-8 p-4 rounded-lg bg-white border border-gray-200 shadow"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="casa"
                  src={
                    item?.propId?.photos[0] ??
                    "https://res.cloudinary.com/doun83yp3/image/upload/v1701882999/images/caba15.jpg.jpg"
                  }
                  className="w-80 h-44 object-cover rounded-lg transition-all duration-200 scale-100 hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <div>
                    <div>
                      <Tag label={item?.propId?.tipo} />
                    </div>
                    <h2 className="text-xl font-medium">
                      {item?.propId?.nombre}
                    </h2>
                    <p>{item?.propId?.desc}</p>
                  </div>

                  <p className="text-xs flex items-center ">
                    <CiLocationOn />
                    <span className="underline">{`${item?.propId.ciudad}, ${item?.propId?.direccion}`}</span>
                  </p>
                </div>

                <p>{moment(item?.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500">No existen arriendos</p>
        </div>
      )}
    </div>
  );
}
