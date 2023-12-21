import { Feature } from "../../components/feature/Feature";
import "./home.css";
import { PropertyList } from "../../components/property/PropertyList";
import { FeatureHouse } from "../../components/featureHouse/FeatureHouse";
import { EmailList } from "../../components/emailList/EmailList";
import Head from "../../components/ui/Head";
import Header from "../../components/header/Header";

export const Home = () => {
  return (
    <>
      <Head title={"Inicio"} />

      <Header />

      <div className="flex justify-center py-10">
        <main className="flex flex-col max-w-7xl w-full gap-10">
          <Feature />

          <PropertyList />

          <FeatureHouse />

          <EmailList />
        </main>
      </div>
    </>
  );
};
