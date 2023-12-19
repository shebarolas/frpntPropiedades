import React, { useState } from "react";
import "./arrendatarios.css";
import { useSelector } from "react-redux";
import { instance } from "../../config/axios";
import { Badge, Descriptions } from "antd";
import { useEffect } from "react";
import { Description } from "../../components/ComponentsAdmin/descriptions/Description";
import "./arrendatarios.css";
export const Arrendatario = () => {
  const { user } = useSelector((state) => state.session);
  const [data, setdData] = useState([]);
  console.log(user);

  const onUser = async () => {
    try {
      const response = await instance.get(`/hotel/getIdArr/${user._id}`);
      setdData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onUser();
  }, []);

  return (
    <div className="arrendatario">
      <div className="aWreapper">
        <div className="dib">
          {data.length === 0
            ? "Cargando......"
            : data.map((item) => (
                <div>{item.arrendar && <Description item={item} />}</div>
              ))}
        </div>
      </div>
    </div>
  );
};
