import Head from "../../components/ui/Head";
import "./loading.css";

export default function Loading() {
  return (
    <>
      <Head title={"Cargando"} />
      <div className="loading">
        <h1>Cargando..</h1>
      </div>
    </>
  );
}
