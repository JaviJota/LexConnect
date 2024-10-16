import { Hero } from "../components/landing/hero";
import { FunctionLeft } from "../components/landing/function-left";
import { FunctionRight } from "../components/landing/function-rigth";
import { Navbar } from "../components/navbar";

export const Landing = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="text-center">
        <h1 className="max-w-xs md:max-w-2xl text-3xl font-bold m-auto mt-20 text-cyan-800">
          Con nuestro CRM, cada aspecto de la gestión legal es más sencillo,
          ágil y organizado.
        </h1>
      </div>
      <FunctionRight title={"Comunicación directa"} />
      <FunctionLeft title={"Gestión de cuentas"} />
      <FunctionRight title={"Optimización de asuntos"} />
      <FunctionLeft title={"Gestión de clientes"} />
    </main>
  );
};
