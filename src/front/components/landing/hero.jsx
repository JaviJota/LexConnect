import { useState } from "react";
import { Register } from "./register";

export const Hero = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  return (
    <div className="relative isolate px-6 lg:px-8 hero">
      <div aria-hidden="true">
        <div />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-40">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Gestiona tus clientes y casos legales.
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-700">
            El CRM diseñado para abogados que buscan optimizar su tiempo <br /> y
            mejorar la relación con sus clientes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="rounded-md bg-cyan-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Regístrate
            </button>
            <Register show={registerModalOpen} close={() => setRegisterModalOpen(false)}/>
            <button
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Solicitar demo <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
      <div aria-hidden="true">
        <div />
      </div>
    </div>
  );
};
