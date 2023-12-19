import { useState } from "react";
import "./register.css";
import {
  InfoCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Input, Form, Tooltip, InputNumber, Switch, notification } from "antd";
import { instance } from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import Head from "../../components/ui/Head";
import video from "../../assets/video/hotel.mp4";
import logo from "../../assets/images/logo.png";

export const Register = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (error) => {
    const messages = error;
    api.open({
      message: "Error!!!!!!!",
      description: messages,
      duration: 4,
    });
  };

  const [data, setData] = useState({
    name: undefined,
    lastmane: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
    isAdmin: false,
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleNumber = (e) => {
    setData((prev) => ({
      ...prev,
      phone: e,
    }));
  };
  const handeAdmin = (e) => {
    setData((prev) => ({
      ...prev,
      isAdmin: e,
    }));
  };

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/user/register", data);
      openNotification();
      navigate("/login");
      console.log(res);
    } catch (error) {
      const { response } = error;
      console.log(response);
      openNotification(response.data.message);
    }
  };
  return (
    <>
      <Head title="Registrar" />

      <div className="relative md:static h-screen flex md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2 relative">
          <video
            className="w-full h-full object-cover relative"
            autoPlay
            loop
            muted
          >
            <source src={video} type="video/mp4" />
          </video>

          <div className="absolute top-0 left-0 w-full h-full banner-gradient flex justify-center items-center">
            <div className="flex flex-col items-center w-2/3 gap-2">
              <img alt="icon" src={logo} className="w-6 h-6 object-cover" />
              <h2 className="text-white font-extrabold text-5xl text-center">
                Registrate para empezar a publicar
              </h2>
              <p className="text-center text-white">
                Inicia esta increible experiencia con nosotros
              </p>
            </div>
          </div>
        </div>

        <div className="h-full flex justify-center items-center absolute top-0 left-0 md:static w-full py-10  px-4 lg:px-10 space-y-4">
          <div className="max-w-xl w-full bg-white p-10 lg:p-6 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <img alt="icon" src={logo} className="w-4 h-4 object-cover" />
              <h1 className="text-black font-bold text-lg">Nuevo usuario</h1>
            </div>
            <Form className="" layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  className="py-2"
                  onChange={handleChange}
                  id="name"
                  placeholder="Enter your name"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input
                  className="py-2"
                  onChange={handleChange}
                  id="lastname"
                  placeholder="Enter your lastname "
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  className="py-2"
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter your email "
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Extra information">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="number"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                  ]}
                >
                  <InputNumber
                    className="py-2 hei"
                    onChange={handleNumber}
                    id="number"
                    placeholder="Enter your Phone Number "
                    addonBefore="+569"
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    suffix={
                      <Tooltip title="Extra information">
                        <InfoCircleOutlined
                          style={{ color: "rgba(0,0,0,.45)" }}
                        />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item name="admin" label="Is Admin?">
                  <Switch onChange={handeAdmin} defaultChecked={data.role} />
                </Form.Item>
              </div>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  className="py-2"
                  onChange={handleChange}
                  id="password"
                  placeholder="Enter your password "
                />
              </Form.Item>

              {contextHolder}
              <button
                onClick={onClick}
                type="button"
                className="w-full bg-primary hover:bg-primary/75 text-white py-2 rounded-md"
              >
                Register
              </button>
              <div className="flex items-center justify-between">
                <Link to="/" className="underline text-xs pt-4">
                  Volver al Inicio
                </Link>
                <div className="flex items-center gap-1 mt-4">
                  <p className="text-xs">Ya tienes una cuenta</p>
                  <Link to={"/login"} className="underline text-xs">
                    Iniciar sesión
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
