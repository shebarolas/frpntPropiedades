import { useEffect, useState } from "react";
import "./verAparment.css";
import { instance } from "../../../config/axios";
import { useSelector } from "react-redux";
// import { SearchItems } from "../../searchItems/SearchItems";
import { DisplayAdmin } from "../displayAdmin/DisplayAdmin";
import { Skeleton } from "antd";
import { CreateAp } from "../createaAperment/CreateAp";

import { BsHouse } from "react-icons/bs";

export const VerAparment = () => {
  const { user } = useSelector((state) => state.session);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const res = async () => {
    try {
      setLoading(true);
      const data = await instance.get(`/hotel/getIdAdmin/${user._id}`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    res();
    return () => {
      setLoad(false);
    };
  }, [load]);

  return (
    <div className="p-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium flex items-center gap-1">
          <BsHouse /> Mis propiedades
        </h1>
        <CreateAp setLoad={setLoad} />
      </div>

      {/* propiedades */}
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {data.map((data) => (
              <DisplayAdmin setLoad={setLoad} data={data} key={data._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
