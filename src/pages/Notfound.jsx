import Head from "../components/ui/Head";

export default function Notfound() {
  return (
    <>
      <Head title="Pagina no encontrada" />

      <div className="h-[80vh] flex justify-center items-center">
        <h1>La pagina no ha sido encontrada</h1>
      </div>
    </>
  );
}
