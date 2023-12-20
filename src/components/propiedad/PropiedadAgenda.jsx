import { DatePicker } from "antd";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Moment from "moment";
import { instance } from "../../config/axios";

export default function PropiedadAgenda({ schedules, propiedad }) {
  const { user } = useSelector((state) => state.session);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const onArrendar = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await instance.post(`/visitas/agendar`, {
        fecha: selectedDate,
        userId: user._id,
        propId: propiedad?._id,
      });

      if (response.status === 200) {
        navigate("/agenda");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    const isToday = current < Moment().endOf("day");
    // Can not select days between schedules range dates from room
    if (schedules) {
      const isUsed = schedules.some((item) =>
        Moment(item?.fecha).isSame(current.format(), "date")
      );
      return isToday || isUsed;
    }

    return isToday;
  };

  const onChange = async (_, dateString) => {
    setSelectedDate(dateString);
  };

  return (
    <div className="w-1/4">
      <div className="bg-white p-4 rounded-lg shadow-md border border-slate-100">
        {/* precio */}

        {!user ? (
          <div className="flex flex-col gap-2">
            <label className="text-xs">Inicia Sesion para arrendar </label>
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
              <span className="text-sm font-medium flex items-center gap-1">
                <CiCalendar />
                Agendar hora
              </span>
              <DatePicker
                onChange={onChange}
                disabledDate={disabledDate}
                placeholder={"Selecciona una fecha"}
                className="border border-primary hover:border-primary"
              />
              <button
                type="button"
                className="bg-primary_dark py-2 text-white rounded-lg"
                onClick={onArrendar}
                disabled={isLoading}
              >
                Agendar
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
