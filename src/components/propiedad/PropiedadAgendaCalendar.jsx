import { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function PropiedadAgendaCalendar({ agenda, propiedad }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCalendarAgenda = useCallback(() => {
    const result = agenda?.map((item, index) => {
      return {
        id: index + 1,
        title: item.idPropiedad?.nombre,
        allDay: true,
        start: new Date(item.fecha),
        end: new Date(item.fecha),
      };
    });

    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    formatCalendarAgenda();

    return () => {
      setLoading(true);
    };
  }, [formatCalendarAgenda]);

  if (loading) return <></>;

  return (
    <div className="flex flex-col gap-2">
      <h3>Calendario de Visitas</h3>

      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
