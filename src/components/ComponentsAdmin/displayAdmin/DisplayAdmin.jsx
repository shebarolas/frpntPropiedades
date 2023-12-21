import "./displayAdmin.css";

import { EditProp } from "../editProp/EditProp";
import { DeleteApartment } from "../deleteAparment/DeleteApartment";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import { Image } from "antd";
import { Carousel } from "antd";
import { formatPrice } from "../../../utils/methods";

export const DisplayAdmin = ({
  data,
  setLoad,
  setModalOpen,
  setSelectPropiedad,
}) => {
  const { photos } = data;

  const handleOpenModal = () => {
    setSelectPropiedad(data);
    setModalOpen(true);
  };

  return (
    <div className="w-full shadow border border-gray-20 rounded-md">
      <div className="flex flex-col gap-2">
        <Carousel autoplay className="w-full">
          {photos.map((photo, i) => (
            <Image
              height={320}
              width={"100%"}
              style={{ borderRadius: "8px" }}
              src={photo}
              key={i}
              className="object-cover"
            />
          ))}
        </Carousel>
        <div className="px-4 pb-4 hover:cursor-pointer">
          <div className="flex flex-col" onClick={handleOpenModal}>
            <h1 className="text-lg font-semibold">{data.nombre}</h1>
            <div className="disLocation">
              <IoLocationOutline />
              <span className="text-sm text-gray-600">
                {data.direccion}, {data.ciudad}
              </span>
            </div>
            <div className="disDesc mt-2">
              <MdOutlinePriceChange />
              <span className="text-md">${formatPrice(data?.valor)}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <EditProp setLoad={setLoad} data={data} />
            <DeleteApartment setLoad={setLoad} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
