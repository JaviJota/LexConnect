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
  const [deleteDeudaModalOpen, setDeleteDeudaModalOpen] = useState(false)

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
  };

  return (
    <>
      <div className="mx-4 flex justify-around border-l-4 border-red-500 bg-gray-200 rounded-md p-1 mb-3 hover:ml-6 hover:mr-2 transition-all">
        <div>
          <p className="font-semibold">Cantidad:</p>
          <p className="font-normal">{deudaData?.amount}€</p>
        </div>
        <div>
          <p className="font-semibold">Concepto:</p>
          <p className="font-normal">{deudaData?.title}</p>
        </div>
        <div>
          <p className="font-semibold">Expediente:</p>
          <p className="font-normal">{deudaData?.expediente}</p>
        </div>
        <div>
          <label className="font-semibold flex items-center" htmlFor="liquidar">
            Liquidar
          </label>
          <input
            name="liquidar"
            id="liquidar"
            type="checkbox"
            onClick={() => handleDeudasPagos(deudaData?.id)}
          />
        </div>
        <div className="self-center">
          <TrashIcon
            className="size-4 cursor-pointer"
            onClick={() => setDeleteDeudaModalOpen(true)}
          />
          <Dialog open={deleteDeudaModalOpen} onClose={close} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <form
                // onSubmit={openRegisterForm ? handleRegisterSubmit : handleLoginSubmit}
                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
              >
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
                            <div>
                              <button className="rounded-md bg-red-500">
                                Eliminar
                              </button>
                              <button className="rounded-md border border-cyan-800">
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </form>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};
