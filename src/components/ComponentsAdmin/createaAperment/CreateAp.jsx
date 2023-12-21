import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  InputNumber,
  notification,
  Switch,
} from "antd";
import { instance } from "../../../config/axios";

import { useSelector } from "react-redux";
import { UploadImg } from "../uploadImg/UploadImg";
import SelectUbication from "../../ui/SelectUbication";

export const CreateAp = ({ setLoad }) => {
  const { user } = useSelector((state) => state.session);

  const [fileList, setFileList] = useState([]);
  const [error, setNulls] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const [credential, setCredential] = useState({
    nombre: "",
    tipo: "",
    ciudad: "",
    direccion: "",
    desc: "",
    valor: 0,
    visible: true,
    bano: 0,
    habitaciones: 0,
    user: user._id,
  });
  const [location, setLocation] = useState({
    latitude: -38.750951,
    longitude: -72.605735,
  });

  const handleFileList = (newFileList) => {
    setFileList(newFileList);
  };

  const handleNumber = (e) => {
    console.log(e);
    setCredential((prev) => ({
      ...prev,
      valor: e,
    }));
  };
  const handleBano = (e) => {
    setCredential((prev) => ({
      ...prev,
      bano: e,
    }));
  };
  const handleRooms = (e) => {
    setCredential((prev) => ({
      ...prev,
      habitaciones: e,
    }));
  };

  const handleType = (e) => {
    console.log(e);
    setCredential((prev) => ({
      ...prev,
      tipo: e,
    }));
  };

  const handleCity = (e) => {
    console.log(e);
    setCredential((prev) => ({
      ...prev,
      ciudad: e,
    }));
  };

  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setNulls("");
    setLoading(false);
  };
  const onChange = (checked) => {
    console.log(checked);

    setCredential((prev) => ({
      ...prev,
      visible: checked,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credential);

    try {
      const formData = new FormData();
      formData.append("nombre", credential.nombre);
      formData.append("tipo", credential.tipo);
      formData.append("ciudad", credential.ciudad);
      formData.append("direccion", credential.direccion);
      formData.append("desc", credential.desc);
      formData.append("valor", credential.valor);
      formData.append("visible", credential.visible);
      formData.append("user", credential.user);
      formData.append("bano", credential.bano);
      formData.append("habitaciones", credential.habitaciones);
      formData.append("lat", location.latitude);
      formData.append("long", location.longitude);
      fileList.map((file) => {
        formData.append("image", file.originFileObj);
      });

      const { status } = await instance.post("/hotel/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(true);
      console.log(status);
      if (status === 200) {
        setLoad(true);
        setCredential({
          nombre: "",
          tipo: "",
          ciudad: "",
          direccion: "",
          desc: "",
          valor: 0,
          visible: true,
          bano: 0,
          habitaciones: 0,
          user: user._id,
        });
        form.resetFields();
        onClose();
      }
    } catch (error) {
      const { response } = error;
      openNotification("Error al crear publicación");
    } finally {
      setLoading(false);
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (error) => {
    const messages = error;
    api.open({
      message: "Notification Title",
      description: messages,
      duration: 0,
    });
  };

  return (
    <>
      <Button
        className="btnEdit"
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Nueva Casa
      </Button>
      {contextHolder}
      <Drawer
        title="Crear una nueva propiedad"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              onClick={handleClick}
              loading={loading}
              type="primary"
              className="bg-primary"
            >
              Crear
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre Propiedad"
                rules={[
                  {
                    required: true,
                    message: "Por favor, Ingresar el nombre de la propiedad",
                  },
                ]}
              >
                <Input
                  id="nombre"
                  defaultValue={credential.nombre}
                  onChange={handleChange}
                  placeholder="Ingresar nombre de la propiedad"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="direccion"
                label="Direccion"
                rules={[
                  {
                    required: true,
                    message: "Por favor, Ingresar direccion de la propiedad",
                  },
                ]}
              >
                <Input
                  id="direccion"
                  defaultValue={credential.direccion}
                  onChange={handleChange}
                  placeholder="Ingresar direccion de la propiedad"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tipo"
                label="Tipo"
                rules={[
                  {
                    required: true,
                    message: "Seleccionar tipo de propiedad",
                  },
                ]}
              >
                <Select
                  id="tipo"
                  options={[
                    {
                      value: "Casa",
                      label: "Casa",
                    },
                    {
                      value: "Departamento",
                      label: "Departamento",
                    },
                    {
                      value: "Otros",
                      label: "Otros",
                    },
                  ]}
                  onChange={handleType}
                  placeholder="Seleccionar tipo de Propiedad"
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ciudad" label="Ciudad">
                <Select
                  id="ciudad"
                  options={[
                    {
                      value: "Angol",
                      label: "Angol",
                    },
                    {
                      value: "Temuco",
                      label: "Temuco",
                    },
                    {
                      value: "Santiago",
                      label: "Santiago",
                    },
                  ]}
                  onChange={handleCity}
                  placeholder="Selecciona ciudad"
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="valor"
                label="Valor"
                rules={[
                  {
                    required: true,
                    message: "Por Favor, Ingresar valor de la propiedad",
                  },
                ]}
              >
                <InputNumber
                  id="valor"
                  style={{ width: 300 }}
                  value={credential.valor}
                  onChange={handleNumber}
                  placeholder="Ingresar valor de la propiedad"
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="featured"
                label="Visible"
                rules={[
                  {
                    required: true,
                    message: "Please",
                  },
                ]}
              >
                <Switch id="featured" defaultChecked onChange={onChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bano"
                label="Cantidad de baños"
                rules={[
                  {
                    required: true,
                    message: "Por favor, Ingresar cantidad de baños",
                  },
                ]}
              >
                <InputNumber
                  id="bano"
                  style={{ width: 300 }}
                  value={credential.bano}
                  onChange={handleBano}
                  placeholder="Ingresar cantidad de baños"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="habitaciones"
                label="Habitaciones"
                rules={[
                  {
                    required: true,
                    message: "Por favor, Ingresar cantidad de habitaciones",
                  },
                ]}
              >
                <InputNumber
                  id="habitaciones"
                  style={{ width: 300 }}
                  value={credential.habitaciones}
                  onChange={handleRooms}
                  placeholder="Ingresar cantidad de habitaciones"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Photos"
                label="Fotos (La primera imagen subida sera utilizada como portada)"
                rules={[
                  {
                    required: true,
                    message: "please upload photos",
                  },
                ]}
              >
                <UploadImg
                  fileList={fileList}
                  handleFileList={handleFileList}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Descripcion"
                rules={[
                  {
                    required: true,
                    message:
                      "Por favor, Ingresar la descripcion de la propiedad",
                  },
                ]}
              >
                <Input.TextArea
                  id="desc"
                  value={credential.desc}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ingresar descripcion de la propiedad"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex flex-col gap-2">
            <h3>Seleccione ubicación</h3>
            <div className="h-[50vh]">
              <SelectUbication location={location} setLocation={setLocation} />
            </div>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
