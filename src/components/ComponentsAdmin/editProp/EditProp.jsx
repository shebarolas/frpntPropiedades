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
} from "antd";
import { Switch } from "antd";
import "./editProp.css";
import { UploadImg } from "../uploadImg/UploadImg";
import { useSelector } from "react-redux";
import { instance } from "../../../config/axios";

export const EditProp = ({ data, setLoad }) => {
  const { user } = useSelector((state) => state.session);

  const [credential, setCredential] = useState({
    nombre: data.nombre,
    tipo: data.tipo,
    ciudad: data.ciudad,
    direccion: data.direccion,
    desc: data.desc,
    valor: data.valor,
    visible: data.visible,
  });
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleFileList = (newFileList) => {
    setFileList(newFileList);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const handleType = (e) => {
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
  const handleNumber = (e) => {
    console.log(e);
    setCredential((prev) => ({
      ...prev,
      valor: e,
    }));
  };

  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (checked) => {
    setCredential((prev) => ({
      ...prev,
      visible: checked,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(credential);
    // console.log(fileList);

    try {
      const formData = new FormData();
      formData.append("nombre", credential.nombre);
      formData.append("tipo", credential.tipo);
      formData.append("ciudad", credential.ciudad);
      formData.append("direccion", credential.direccion);
      formData.append("desc", credential.desc);
      formData.append("valor", credential.valor);
      formData.append("visible", credential.visible);
      fileList.map((file) => {
        formData.append("image", file.originFileObj);
      });
      const { status } = await instance.put(
        `/hotel/update/${data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (status === 200) {
        setLoad(true);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        className="btnEdit"
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Editar Propiedad
      </Button>

      <Drawer
        title="Editar mi propiedad"
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
            <Button onClick={handleClick} type="primary">
              Editar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresar nombre de la casa",
                  },
                ]}
              >
                <Input
                  id="nombre"
                  defaultValue={credential.nombre}
                  onChange={handleChange}
                  placeholder="Ingresar nombre de la casa"
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
                    message: "Por favor, Selecciona el tipo de propiedad",
                  },
                ]}
              >
                <Select
                  id="tipo"
                  defaultValue={credential.tipo}
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
                  placeholder="Seleccionar tipo de propiedad"
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ciudad" label="Ciudad">
                <Select
                  id="ciudad"
                  defaultValue={credential.ciudad}
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
                  defaultValue={credential.valor}
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
                name="visible"
                label="Visible"
                rules={[
                  {
                    required: true,
                    message: "Please",
                  },
                ]}
              >
                <Switch
                  id="visible"
                  defaultChecked={credential.visible}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Photos"
                label="Photos"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
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
                    message: "Por favor, Agregar descripcion de la propiedad",
                  },
                ]}
              >
                <Input.TextArea
                  id="desc"
                  defaultValue={credential.desc}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ingresar descripcion de la propiedad"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
