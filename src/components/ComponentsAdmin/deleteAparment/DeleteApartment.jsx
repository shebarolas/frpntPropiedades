import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { instance } from "../../../config/axios";

export const DeleteApartment = ({ data, setLoad }) => {
  const deleteClick = async (e) => {
    e.preventDefault();
    try {
      console.log(data.user);
      await instance.delete(`/hotel/delete/${data._id}`);
      setLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popconfirm
      title="Eliminar Propiedad"
      description="Estas seguro de querer eliminar la propiedad?"
      icon={
        <QuestionCircleOutlined
          style={{
            color: "red",
          }}
        />
      }
      onConfirm={deleteClick}
      okText="Eliminar"
      cancelText="Cancelar"
    >
      <Button className="btnDelete" danger>
        Eliminar
      </Button>
    </Popconfirm>
  );
};
