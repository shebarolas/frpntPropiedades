import "./emailList.css";

export const EmailList = () => {
  return (
    <div className="bg-primary text-white h-48 flex justify-center items-center rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-3xl font-bold">
            ¿Quieres recibir notificaciones?
          </h1>
          <span className="">Semanalmente, vas a recibir anuncios </span>
        </div>
        <div className="emialListInputs">
          <input type="text" placeholder="your@email.com" />
          <button>Suscribe</button>
        </div>
      </div>
    </div>
  );
};
