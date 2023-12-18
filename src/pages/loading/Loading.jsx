import "./loading.css";
import Head from "../../components/ui/Head";
import Spinner from "../../components/ui/Spinner";

export default function Loading() {
  return (
    <>
      <Head title={"Cargando"} />
      <div className="h-screen flex flex-col gap-2 items-center justify-center bg-primary">
        <Spinner />
        <h1 className="text-white">Cargando..</h1>
      </div>
    </>
  );
}
