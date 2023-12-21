import { CiCalendar } from "react-icons/ci";
import { diasFaltantes } from "../../utils/methods";
import { CiUser, CiLocationOn } from "react-icons/ci";
import moment from "moment";
import Tag from "../ui/Tag";
import { BsHousesFill } from "react-icons/bs";
import { instance } from "../../config/axios";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { useState } from "react";
import Spinner from "../ui/Spinner";

export default function TimelineItem({ agenda, setReloadHoras }) {
  const { user } = useSelector((state) => state.session);
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const arrendarPropiedad = async () => {
    try {
      setIsLoading(true);
      const response = await instance.post("/arrendar/agendar", {
        userId: user?._id,
        id: agenda?.idPropiedad?._id,
      });

      if (response.status === 200) {
        setReloadHoras(true);
        api.success({
          message: "La propiedad ha sido arrendada",
          description: "La propiedad ha sido arrendada, felicidades",
          duration: 5000,
        });
      }
    } catch (e) {
      console.log(e);
      api.error({
        message: "Error",
        description: "Error al arrendar la propiedad",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <div className="flex gap-8 p-4 rounded-lg bg-white border border-gray-200 shadow">
        <div>
          <p className="flex items-center gap-1 text-xs">
            <CiCalendar />
            {moment(agenda?.fecha).format("DD-MM-YYYY")}
          </p>
          <p>{diasFaltantes(moment(agenda?.fecha))} dias restantes</p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <img
            alt="casa"
            src={
              agenda?.idPropiedad?.photos[0] ??
              "https://res.cloudinary.com/doun83yp3/image/upload/v1701882999/images/caba15.jpg.jpg"
            }
            className="w-80 h-44 object-cover rounded-lg transition-all duration-200 scale-100 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="flex items-center text-xs gap-1">
              <CiUser />
              Host:{" "}
              <span className="underline">{`${agenda?.user.name} ${agenda?.user.lastname}`}</span>
            </p>

            <div>
              <div>
                <Tag label={agenda?.idPropiedad?.tipo} />
              </div>
              <h2 className="text-xl font-medium">
                {agenda?.idPropiedad?.nombre}
              </h2>
              <p>{agenda?.idPropiedad?.desc}</p>
            </div>

            <p className="text-xs flex items-center ">
              <CiLocationOn />
              <span className="underline">{`${agenda?.idPropiedad.ciudad}, ${agenda?.idPropiedad?.direccion}`}</span>
            </p>
          </div>

          {agenda?.idPropiedad?.arrendada ? (
            <p className="text-xs text-gray-500">
              Lo sentimos, la propiedad ya esta arrendada
            </p>
          ) : (
            <div className="">
              <button
                type="button"
                className="px-4 py-1 bg-primary text-white rounded-md flex items-center gap-1 hover:bg-primary/80 transition-all duration-200 ease-out hover:cursor-pointer"
                disabled={isLoading}
                onClick={arrendarPropiedad}
              >
                {isLoading ? (
                  <Spinner size="xs" />
                ) : (
                  <BsHousesFill className="h-4 w-4" />
                )}
                Arrendar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
