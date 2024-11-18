import { useEffect, useState } from "react";
import { ClientCard } from "./clientCard";
import { AddClient } from "./addClient";
import { useClientsStore } from "../../../store/clientDataStore.jsx";
import { useUserStore } from "../../../store/userDataStore";

export const ClientDashboard = () => {
  const getClientsFunc = useClientsStore((state) => state.getClients);
  const clients = useClientsStore((state) => state.clients);
  const userDataFromStore = useUserStore((state) => state.userData);

  const userData = userDataFromStore || JSON.parse(localStorage.getItem('lexigestUserData'));
  const userId = userData?.id;
  const [error, setError] = useState("");
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);

  const loadClients = async () => {
    const getClients = await getClientsFunc(userId);
    if (!getClients.success) {
      setError(getClients.msg);
      return;
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <main className="p-4">
      <section>
        <h1 className="text-2xl font-bold text-[#2296A6] my-3 ml-3">
          Clientes
        </h1>
        <hr />
      </section>
      <section>
        <section className="flex flex-col md:flex-row mt-5 justify-between">
          <div className="flex flex-col align-bottom mb-4 md:mb-0">
            <label className="text-lg font-semibold ml-3">Buscar cliente:</label>
            <input
              type="text"
              className="w-full md:w-[290px] ml-3 mt-2 p-1.5 bg-gray-300 rounded-md"
            />
          </div>
          <div className="content-end ml-3 md:ml-0 md:mr-10">
            <button
              onClick={() => setAddClientModalOpen(true)}
              className="rounded-md bg-[#2296A6] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Añadir cliente
            </button>
            <AddClient
              show={addClientModalOpen}
              close={() => setAddClientModalOpen(false)}
            />
          </div>
        </section>

        <section className="mt-10">
          <main className="hidden lg:grid grid-flow-col grid-cols-6 mx-3 sm:mx-0 mb-5 py-2.5 justify-items-center rounded-md bg-[#2296A6]">
            <div className="text-white font-semibold">Nombre</div>
            <div className="text-white font-semibold">Email</div>
            <div className="text-white font-semibold">Teléfono</div>
            <div className="text-white font-semibold">Expedientes</div>
            <div className="text-white font-semibold">Deudas</div>
            <div className="text-white font-semibold">Pagos</div>
          </main>
          {clients && clients.length > 0 ? (
            clients.map((client, index) => (
              <ClientCard key={index} client={client} />
            ))
          ) : (
            <h1 className="mx-3 font-semibold">
              No se ha encontrado ningún cliente.
            </h1>
          )}
        </section>
      </section>
    </main>
  );
};
