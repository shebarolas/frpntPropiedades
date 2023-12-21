import { useSelector } from "react-redux";
import Head from "../../components/ui/Head";

import { HiOutlineMail } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import useFetch from "../../components/Hooks/useFecth";
import { API_URL } from "../../config/constants";
import Spinner from "../../components/ui/Spinner";
import { Timeline } from "antd";
import TimelineItem from "../../components/agenda/TimelineItem";
import { GrSchedulePlay } from "react-icons/gr";

export default function Profile() {
  const { user } = useSelector((state) => state.session);
  const { data, loading } = useFetch(
    `${API_URL}/visitas/obtenerIdCliente/${user?._id}`
  );

  if (loading)
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

          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-1">
              <GrSchedulePlay />
              Mis visitas
            </h2>
            <div className="w-full">
              <Timeline
                items={data?.map((item, index) => {
                  return {
                    children: <TimelineItem key={index} agenda={item} />,
                  };
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
