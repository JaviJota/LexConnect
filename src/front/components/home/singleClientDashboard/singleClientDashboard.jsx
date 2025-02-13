import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DeudaCard } from "./deudaCard.jsx";
import { PagoCard } from "./pagoCard.jsx";
import { AddDeuda } from "./addDeuda.jsx";
import { CaseFileCard } from "./caseFileCard.jsx";

import { useDeudasStore } from "../../../store/deudaDataStore.jsx";
import { useClientsStore } from "../../../store/clientDataStore.jsx";
import { useExpedientesStore } from "../../../store/expedienteDataStore.jsx";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { AddDeudaButton } from "./addDeudaButton.jsx";

export const SingleClientDashboard = () => {
  const deudas = useDeudasStore((state) => state.deudas);
  const pagos = useDeudasStore((state) => state.pagos);
  const getDeudasFunc = useDeudasStore((state) => state.getDeudas);
  const getPagosFunc = useDeudasStore((state) => state.getPagos);
  const client = useClientsStore((state) => state.currentClient);
  const getClientFunc = useClientsStore((state) => state.getClient);
  const getClientCaseFilesFunc = useExpedientesStore(
    (state) => state.getClientCaseFiles
  );
  const params = useParams();

  const tabs = [
    { id: "tab1", label: "Resumen" },
    { id: "tab2", label: "Deudas" },
    { id: "tab3", label: "Pagos" },
    { id: "tab4", label: "Expedientes" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [error, setError] = useState("");
  const [addDeudaModalOpen, setAddDeudaModalOpen] = useState(false);

  const loadClient = async () => {
    const getClient = await getClientFunc(params.theid);
    if (!getClient.success) {
      setError(getClient.msg);
      return;
    }
  };

  const loadDeudas = async () => {
    const getDeudas = await getDeudasFunc(params.theid);
    if (!getDeudas.success) {
      setError(getDeudas.msg);
      return;
    }
  };

  const loadPagos = async () => {
    const getPagos = await getPagosFunc(params.theid);
    if (!getPagos.success) {
      setError(getPagos.msg);
      return;
    }
  };

  const loadClientCaseFiles = async () => {
    const getClientCaseFiles = await getClientCaseFilesFunc(params.theid);
    if (!getClientCaseFiles.success) {
      setError(getClientCaseFiles.msg);
      return;
    }
  };

  const tabContent = {
    tab1: "Hola mundo",
    tab2: (
      <div>
        <div className="flex justify-between mr-5">
          <h5 className="pb-4 px-4 font-bold text-gray-800 text-xl">Deudas</h5>
          <button
            className="text-sm px-3 rounded-full flex items-center"
            onClick={() => setAddDeudaModalOpen(true)}
          >
            <PlusCircleIcon className="size-7 ml-1 hover:bg-gray-600 hover:text-white hover:scale-105 transition-all rounded-full text-gray-600" />
          </button>
          <AddDeuda
            show={addDeudaModalOpen}
            close={() => setAddDeudaModalOpen(false)}
          />
        </div>
        <div className="mt-5 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deudas && deudas.length > 0 ? (
            deudas.map((deuda) => <DeudaCard key={deuda.id} deuda={deuda} />)
          ) : (
            <AddDeudaButton />
          )}
        </div>
      </div>
    ),
    tab3: (
      <div>
        <h5 className="p-4 font-bold text-gray-800 text-xl">Pagos</h5>
        <div className="mt-5 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pagos && pagos?.length > 0 ? (
            pagos.map((pago) => <PagoCard key={pago.id} pago={pago} />)
          ) : (
            <div className="ml-7 py-4">No hay ninguna deuda liquidada.</div>
          )}
        </div>
      </div>
    ),
    tab4: (
      <div className="p-4">
        <h5 className="font-bold text-gray-800 text-xl">Expedientes</h5>
        <div className="flex flex-wrap gap-4">
          {client?.CaseFiles && client?.CaseFiles?.length > 0 ? (
            client?.CaseFiles?.map((caseFile) => (
              <CaseFileCard key={caseFile.id} caseFile={caseFile} />
            ))
          ) : (
            <h6 className="mt-3 ml-8">Aún no hay un expediente asociado.</h6>
          )}
        </div>
      </div>
    ),
  };

  useEffect(() => {
    loadClient();
    loadDeudas();
    loadPagos();
    // loadClientCaseFiles();
  }, []);

  return (
    <main className="flex flex-col lg:flex-row">
      <section className="lg:min-h-screen px-14 border">
        <div className="text-end mb-10">
          <button className="bg-cyan-800 text-white py-2 px-2 rounded-full">
            <Cog6ToothIcon className="size-5" />
          </button>
        </div>
        <div>
          <div className="rounded-full mx-auto mb-5 w-32 h-32 bg-gray-400"></div>
          <h1 className="text-xl font-semibold text-cyan-800">
            {client.firstName} {client.lastName}
          </h1>
          <div className=" rounded-md">
            <h5 className="font-bold text-gray-800 text-lg">Contacto</h5>
            <div>
              <p className="font-medium text-normal">
                Email:{" "}
                <span className="text-md font-normal">{client.email}</span>
              </p>
              <p className="font-medium text-md">
                Teléfono:{" "}
                <span className="text-md font-normal">
                  {client.phoneNumber}
                </span>
              </p>
              <p className="font-medium text-md">
                Otros datos:{" "}
                <span className="text-md font-normal">
                  {client.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1 border">
        <div className=" justify-center border-b my-10 flex flex-wrap">
          {tabs?.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 mx-6 text-lg font-bold transition ${
                activeTab === tab.id
                  ? "border-b-2 border-cyan-800 text-cyan-800 scale-105"
                  : "text-gray-500 hover:text-gray-600 hover:scale-105"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{tabContent[activeTab]}</div>
      </section>
    </main>
  );
};
