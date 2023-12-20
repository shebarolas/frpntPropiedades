import { CiCalendar } from "react-icons/ci";
import { diasFaltantes } from "../../utils/methods";
import { CiUser, CiLocationOn } from "react-icons/ci";
import moment from "moment";
import Tag from "../ui/Tag";

export default function TimelineItem({ agenda }) {
  console.log(agenda);
  return (
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
        </div>

        <div className="">
          <p className="text-xs flex items-center ">
            <CiLocationOn />
            <span className="underline">{`${agenda?.idPropiedad.ciudad}, ${agenda?.idPropiedad?.direccion}`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
