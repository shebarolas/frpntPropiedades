import { useSelector } from "react-redux";
import { API_URL } from "../../config/constants";
import useFetch from "../Hooks/useFecth";

export default function ProfileArriendos() {
  const { user } = useSelector((state) => state.session);
  //   const {data, loading} = useFetch(`${API_URL}/arrendar/${user?._id}/arriendos`);
  // console.log(data);
  if (true) return <></>;

  return <div>ProfileArriendos</div>;
}
