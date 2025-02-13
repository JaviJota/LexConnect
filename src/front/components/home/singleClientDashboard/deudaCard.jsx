import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeudasStore } from "../../../store/deudaDataStore.jsx";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export const DeudaCard = (deuda) => {
  const deudaToPagoFunc = useDeudasStore((state) => state.deudaToPago);
  const deleteDeudaFunc = useDeudasStore((state) => state.deleteDeuda);
  const [deleteDeudaModalOpen, setDeleteDeudaModalOpen] = useState(false);

  const deudaData = deuda?.deuda;
  const [error, setError] = useState("");

  const handleDeudasPagos = async (id) => {
    const deleteDeudaAddPago = await deudaToPagoFunc(id);
    if (!deleteDeudaAddPago.success) {
      setError(deleteDeudaAddPago.msg);
      return;
    }
  };

  const handleDeleteDeuda = async () => {
    const deleteDeuda = await deleteDeudaFunc(deudaData.id);
    if (!deleteDeuda.success) {
      setError(deleteDeuda.msg);
      return;
    }
    setDeleteDeudaModalOpen(false);
  };

  return (
    <>
      <div className="rounded-lg p-4 min-w-[250px] max-w-sm h-auto shadow-md transition-transform hover:scale-105 border-l-4 border-red-500 bg-red-100 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-bold text-gray-800">Deuda</h4>

          <div className="mt-3 space-y-2">
            <div>
              <h6 className="text-sm font-semibold text-gray-600">Cantidad:</h6>
              <p className="text-md text-gray-900">{deudaData?.amount}€</p>
            </div>

            <div>
              <h6 className="text-sm font-semibold text-gray-600">Concepto:</h6>
              <p className="text-md text-gray-900 break-words">
                {deudaData?.title}
              </p>
            </div>

            <div>
              <h6 className="text-sm font-semibold text-gray-600">
                Expediente:
              </h6>
              <p className="text-md text-gray-900">
                {deudaData?.CaseFile?.numExp}
              </p>
            </div>
          </div>
        </div>

        {/* Sección inferior con checkbox y papelera */}
        <div className="flex items-center justify-between mt-3">
          <label className="text-sm font-semibold text-gray-600 flex items-center">
            <input
              name="liquidar"
              type="checkbox"
              className="cursor-pointer accent-red-600 mr-2"
              onChange={() => handleDeudasPagos(deudaData?.id)}
            />
            Liquidar
          </label>

          <div
            className="hover:bg-gray-300 rounded-full p-2 cursor-pointer"
            onClick={() => setDeleteDeudaModalOpen(true)}
          >
            <TrashIcon className="size-4 text-red-600" />
          </div>
        </div>
        
        {/* Modal de Confirmación */}
        <Dialog
          open={deleteDeudaModalOpen}
          onClose={() => setDeleteDeudaModalOpen(false)}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div className="mb-3">
                        <h1 className="text-2xl font-bold text-cyan-800">
                          LexConnect
                        </h1>
                      </div>
                      <DialogTitle
                        as="h3"
                        className="text-xl text-center font-semibold leading-6 text-gray-900"
                      >
                        Eliminar deuda
                      </DialogTitle>
                      <div className="mt-1">
                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          {error ? (
                            <div className="sm:col-span-12 flex flex-col items-center">
                              <p className="w-72 text-sm leading-6 text-gray-500  bg-red-100 p-3 rounded-md">
                                {/* <i className="fa-solid fa-circle-exclamation mr-2" style={{color: "#f87171"}}></i> */}
                                <i
                                  className="fa-solid fa-triangle-exclamation mr-2"
                                  style={{ color: "#f87171" }}
                                ></i>
                                {error}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="sm:col-span-12 flex flex-col items-center">
                            <h5>
                              ¿Estás seguro de que deseas eliminar esta deuda?
                            </h5>
                          </div>
                          <div className="sm:col-span-12 flex justify-around w-52 mx-auto items-center mt-2">
                            <button
                              onClick={handleDeleteDeuda}
                              className=" justify-center rounded-md border border-red-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-600 hover:text-white"
                            >
                              Eliminar
                            </button>
                            <button
                              onClick={() => setDeleteDeudaModalOpen(false)}
                              className=" justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 "
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};
