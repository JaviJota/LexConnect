import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DeudaCard } from "./deudaCard.jsx";
import { PagoCard } from "./pagoCard.jsx";
import { AddDeuda } from "./addDeuda.jsx";
import { useDeudasStore } from "../../../store/deudaDataStore.jsx";
import { useParams } from "react-router-dom";
import { useClientsStore } from "../../../store/clientDataStore.jsx";

export const SingleClientDashboard = () => {
  const deudas = useDeudasStore((state) => state.deudas);
  const pagos = useDeudasStore((state) => state.pagos);
  const getDeudasFunc = useDeudasStore((state) => state.getDeudas);
  const getPagosFunc = useDeudasStore((state) => state.getPagos);
  const client = useClientsStore((state) => state.currentClient);
  const getClientFunc = useClientsStore((state) => state.getClient);
  const params = useParams();

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

  useEffect(() => {
    loadClient();
    loadDeudas();
    loadPagos();
  }, []);

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="mt-4 mx-5 text-5xl font-bold text-cyan-800">
          {client.firstName} <br /> {client.lastName}
        </h1>
        <div className="mr-3 self-end">
          <button className="bg-cyan-800 text-white py-2 px-4 rounded-md ">
            Editar datos
          </button>
        </div>
      </div>
      <div className=" rounded-md mx-5 py-4">
        <h5 className="py-4 font-bold text-gray-800 text-lg">Contacto</h5>
        <div>
          <p className="ml-4 font-medium text-normal">
            Email: <span className="text-md font-normal">{client.email}</span>
          </p>
          <p className="ml-4 mt-3 font-medium text-md">
            Teléfono:{" "}
            <span className="text-md font-normal">{client.phoneNumber}</span>
          </p>
          <p className="ml-4 mt-3 font-medium text-md w-full">
            Otros datos:{" "}
            <span className="text-md font-normal block w-1/2">{client.description}</span>
          </p>
        </div>
      </div>
      <hr className="mt-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12 mt-8">
        <div className="col-span-2">
          <div className="space-y-4 lg:space-y-12">
            <div className="min-h-32  rounded-md">
              <div className="flex justify-between mr-5">
                <h5 className="pb-4 px-4 font-bold text-gray-800 text-xl">
                  Deudas
                </h5>
                <button
                  className="text-sm px-3 rounded-full flex items-center"
                  onClick={() => setAddDeudaModalOpen(true)}
                >
                  <PlusCircleIcon className="size-7 ml-1 hover:bg-gray-600 hover:text-white transition-all rounded-full text-gray-600" />
                </button>
                <AddDeuda
                  show={addDeudaModalOpen}
                  close={() => setAddDeudaModalOpen(false)}
                />
              </div>
              <div className="max-h-96 overflow-y-auto">
                {deudas && deudas?.length > 0 ? (
                  deudas.map((deuda) => (
                    <DeudaCard key={deuda.id} deuda={deuda} />
                  ))
                ) : (
                  <div className="ml-7 py-4">
                    No hay ninguna deuda creada.
                  </div>
                )}
              </div>
            </div>
            <div className="min-h-32  rounded-md">
              <h5 className="p-4 font-bold text-gray-800 text-xl">Pagos</h5>
              <div className="max-h-96 overflow-y-auto">
              {pagos && pagos?.length > 0 ? (
                  pagos.map((pago) => (
                    <PagoCard key={pago.id} pago={pago} />
                  ))
                ) : (
                  <div className="ml-7 py-4">
                    No hay ninguna deuda liquidada.
                  </div>
                )}
                {/* <p className="ml-8">Aún no se ha realizado ningún pago.</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-12">
          <div className="bg-gray-200 rounded-md p-4">
            <h5 className="font-bold text-gray-800 text-xl">Expedientes</h5>
            <div className="mt-3 ml-8">Aún no hay un expediente asociado.</div>
          </div>
        </div>
      </div>
    </main>
  );
};
