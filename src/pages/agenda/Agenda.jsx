import { Timeline } from "antd";
import useFetch from "../../components/Hooks/useFecth";
import Head from "../../components/ui/Head";
import { API_URL } from "../../config/constants";
import TimelineItem from "../../components/agenda/TimelineItem";
import { GrSchedulePlay } from "react-icons/gr";
import { useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";

export default function Agenda() {
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
      <Head title="Mi agenda" />
      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-7xl py-8 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-1">
            <GrSchedulePlay />
            Mis visitas
          </h2>

          {/* visitas */}
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
      ;
    </>
  );
}
