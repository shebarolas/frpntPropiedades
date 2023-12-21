import { Dashboard } from "../../components/ComponentsAdmin/dashboard/Dashboard";
import Head from "../../components/ui/Head";

export const InicioAdmin = () => {
  return (
    <>
      <Head title="Dashboard" />

      <div>
        <Dashboard />
      </div>
    </>
  );
};
