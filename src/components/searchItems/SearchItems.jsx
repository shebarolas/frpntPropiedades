import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";

export const SearchItems = ({ data }) => {
  const { user } = data;
  console.log(user.name);
  return (
    <div className="searchItems">
      <div className="sItemContainer">
        <img src={data.photos[0]} alt="" />
        <div className="sItemSubContainer">
          <div className="sItemTitle">
            <h1>{data.name}</h1>
            <span>Ciudad: {data.city}</span>
            <span>Descripcion: {data.desc}</span>
            <span className="red">Direccion: {data.adress}</span>
          </div>
          <div className="sItemButton">
            <span>
              Dueño: {user.name} {user.lastname}
            </span>
            <span>Valor: ${data.price}</span>
            <Link to={`/propiedad/${data._id}`}>
              <button>Arerndar Propiedad</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
