import { useState } from "react";
import "./arrendatarios.css";
import { useSelector } from "react-redux";
import { instance } from "../../config/axios";
import { Table, Tag } from "antd";
import { useEffect } from "react";
// import { Description } from "../../components/ComponentsAdmin/descriptions/Description";
import "./arrendatarios.css";
import { FiUserCheck } from "react-icons/fi";
import Spinner from "../../components/ui/Spinner";
import { IoLocation } from "react-icons/io5";
import moment from "moment";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Correo Electronico",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Propiedad",
    dataIndex: "house",
    key: "house",
  },
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
    render: (type) => (
      <Tag
        color={
          type === "Casa" ? "cyan" : type === "Departamento" ? "lime" : "purple"
        }
      >
        {type}
      </Tag>
    ),
  },
  {
    title: "Dirección",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <div className="flex items-start">
        <IoLocation />
        <span className="text-xs">{address}</span>
      </div>
    ),
  },
  {
    title: "Fecha de arriendo",
    dataIndex: "arriendo",
    key: "arriendo",
  },
];

export const Arrendatario = () => {
  const { user } = useSelector((state) => state.session);
  const [data, setdData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onUser = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get(`/hotel/getIdArr/${user._id}`);
      if (response.status === 200) {
        const filter = response.data.filter((item) => item.arrendar != null);

        if (filter) {
          const format = filter.map((item) => {
            return {
              key: item._id,
              name: `${item?.arrendar?.user?.name} ${item?.arrendar?.user?.lastname}`,
              email: item?.arrendar?.user?.email,
              phone: item?.arrendar?.user?.phone
                ? `+569 ${item?.arrendar?.user?.phone}`
                : "Sin registro de telefono",
              house: item?.nombre,
              address: `${item?.ciudad}, ${item?.direccion}`,
              type: item?.tipo,
              arriendo: moment(item?.arriendo?.createdAt).format("DD/MM/YYYY"),
            };
          });
          setdData(format);
        } else {
          setdData([]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    onUser();
  }, []);

  return (
    // <div className="arrendatario">
    //   <div className="aWreapper">
    //     <div className="dib">
    //       {data.length === 0
    //         ? "Cargando......"
    //         : data.map((item) => (
    //             <div>{item.arrendar && <Description item={item} />}</div>
    //           ))}
    //     </div>
    //   </div>
    // </div>

    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-xl font-medium flex items-center gap-1">
        <FiUserCheck /> Mis Arrendatarios
      </h1>
      {/* table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Spinner />
        </div>
      ) : (
        <Table dataSource={data} columns={columns} pagination={false} />
      )}
    </div>
  );
};
