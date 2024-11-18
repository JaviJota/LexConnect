import { useEffect, useState } from "react";
import { ExpedienteCard } from "./expedienteCard";
import { AddExpediente } from "./addExpediente";
import { useClientsStore } from "../../../store/ClientDataStore";
import { useUserStore } from "../../../store/userDataStore";
import { useExpedientesStore } from "../../../store/expedienteDataStore";


export const ExpedienteDashboard = () => {
  const getClientsFunc = useClientsStore((state) => state.getClients);
  const expedientes = useExpedientesStore((state) => state.expedientes);
  const getExpedientesFunc = useExpedientesStore((state) => state.getExpedientes)
  const userDataFromStore = useUserStore((state) => state.userData);

  const userData = userDataFromStore || JSON.parse(localStorage.getItem('lexigestUserData'));
  const userId = userData?.id;

  const [error, setError] = useState("");
  const [addExpedienteModalOpen, setAddExpedienteModalOpen] = useState(false);



  const loadExpedientes = async () => {
    const getExpedientes = await getExpedientesFunc(userId);
    if (!getExpedientes.success) {
      setError(getExpedientes.msg);
      return;
    }
  };

  const loadClients = async () => {
    const getClients = await getClientsFunc(userId);
    if (!getClients.success) {
      setError(getClients.msg);
      return;
    }
  };

  useEffect(() => {
    loadExpedientes();
    loadClients();
  }, []);

  return (
    <main>
    <section>
      <h1 className="text-2xl font-bold text-[#A97CC0] my-3 ml-3">
        {/* Hola, <span className="text-2xl font-bold">{userData?.first_name}!</span> */}
        Expedientes
      </h1>
      <hr />
    </section>
    <section>
      <section className="flex mt-5 justify-between">
        <div className="flex flex-col align-bottom">
          <label className="text-lg font-semibold ml-3">Buscar número de expediente:</label>
          <input
            type="text"
            className="w-[290px] ml-3 mt-2 p-1.5 bg-gray-300 rounded-md"
          />
        </div>
        <div className="mr-10">
          <button
            onClick={() => setAddExpedienteModalOpen(true)}
            className="rounded-md bg-[#A97CC0] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#9467BD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Añadir expediente
          </button>
          <AddExpediente
            show={addExpedienteModalOpen}
            close={() => setAddExpedienteModalOpen(false)}
          />
        </div>
      </section>
      <section className="mt-10">
        <main className="grid grid-flow-col grid-cols-6 mx-3 mb-5 py-2.5 justify-items-center rounded-md bg-[#A97CC0]">
          <div className="text-white font-semibold">Nº de expediente</div>
          <div className="text-white font-semibold">N.I.G.</div>
          <div className="text-white font-semibold">Juzgado</div>
          <div className="text-white font-semibold">Deudas</div>
          <div className="text-white font-semibold">Fecha de apertura</div>
          <div className="text-white font-semibold">Estado</div>
        </main>
        {expedientes && expedientes?.length > 0 ? (
          expedientes?.map((expediente, index) => (
            <ExpedienteCard key={index} expediente={expediente}/>
          ))
        ) : (
          <h1 className="mx-3 font-semibold">No se ha encontrado ningún expediente.</h1>
        )}
      </section>
    </section>
  </main>
    
  );
};
