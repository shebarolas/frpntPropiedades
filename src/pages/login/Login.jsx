import { useState } from "react";
import "./login.css";
import { setSession } from "../../redux/slices/session-slice";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../config/axios";
import { Input, Form, Tooltip, Button, notification } from "antd";
import { InfoCircleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN } from "../../config/constants";

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
    <div className="login">
      <div className="lconteiner">
        <h1 className="text-white font-bold text-2xl">Iniciar Sesion</h1>
        <Form className="formR" layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              className="back"
              onChange={handleChange}
              id="email"
              placeholder="Enter your email "
              prefix={<MailOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              className="back"
              onChange={handleChange}
              id="password"
              placeholder="Enter your password "
            />
          </Form.Item>
          {contextHolder}
          <Button
            onClick={handleClick}
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-primary_dark"
          >
            Iniciar Sesión
          </Button>
          <div className="link flex items-center gap-1">
            <p>Don't have an account?</p>
            <Link to={"/register"} className="underline">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
