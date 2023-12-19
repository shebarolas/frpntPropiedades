import { useState } from "react";
import "./login.css";
import { setSession } from "../../redux/slices/session-slice";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../config/axios";
import { Input, Form, Tooltip, notification } from "antd";
import { InfoCircleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN } from "../../config/constants";
import Head from "../../components/ui/Head";
import video from "../../assets/video/hotel.mp4";
import logo from "../../assets/images/logo.png";

export const Login = () => {
  const [credential, setCredential] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {user} = useSelector((state) => state.session );

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (error) => {
    const messages = error;
    api.open({
      message: "Error!!!!!!!",
      description: messages,
      duration: 4,
    });
  };

  const handleChange = (e) => {
    setCredential((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credential);

    try {
      const res = await instance.post("/user/login", credential);
      console.log(res.data);
      const { access_token, user } = res.data;
      localStorage.setItem(ACCESS_TOKEN, access_token);
      dispatch(setSession(user));
      if (user.isAdmin) {
        console.log("entro");
        navigate("/", {
          replace: true,
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      const { response } = error;
      console.log(response);
      openNotification(response.data.message);
    }
  };

  return (
    <>
      <Head title="Iniciar Sesión" />

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
                Inicia tu cuenta para empezar a publicar
              </h2>
              <p className="text-center text-white">Accede a tus propiedades</p>
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
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  className="back"
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
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  className="back"
                  onChange={handleChange}
                  id="password"
                  placeholder="Enter your password "
                />
              </Form.Item>
              {contextHolder}
              <button
                onClick={handleClick}
                type="button"
                className="bg-primary w-full hover:bg-primary/75 text-white py-2 rounded-md"
              >
                Iniciar Sesión
              </button>
            </Form>

            <div className="flex items-center justify-between">
              <Link to="/" className="underline text-xs pt-4">
                Volver al Inicio
              </Link>
              <div className="link mt-4 flex justify-center items-center gap-1 text-xs">
                <p>No tienes cuenta</p>
                <Link to={"/register"} className="underline">
                  Registrate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
