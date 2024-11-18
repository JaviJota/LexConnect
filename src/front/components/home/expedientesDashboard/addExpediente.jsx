"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  BackspaceIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useClientsStore } from "../../../store/ClientDataStore";
import { useUserStore } from "../../../store/userDataStore";
import { useExpedientesStore } from "../../../store/expedienteDataStore";

export const AddExpediente = ({ show, close }) => {
  const clients = useClientsStore((state) => state.clients);
  const userDataFromStore = useUserStore((state) => state.userData);
  const createNewExpediente = useExpedientesStore((state) => state.addExpediente)

  const userData = userDataFromStore || JSON.parse(localStorage.getItem("lexigestUserData"));
  const userId = userData?.user?.id;

  const [open, setOpen] = useState(show);
  const [clientDropdownOpened, setClientDropdownOpened] = useState(false);
  
  const [error, setError] = useState("");
  const [clientInputValue, setClientInputValue] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);

  const [formData, setFormData] = useState({
    numExp: "",
    nig: "",
    clientId: [],
    status: "",
    court:"",
    description: "",
    userId: userId,
  });

  const dropdownRef = useRef(null);

  const handleRemoveClient = (client) => {
    setSelectedClients(
      selectedClients.filter((currentClient) => currentClient.id !== client.id)
    );
    setFormData({
      ...formData,
      clientId: [
        ...formData.clientId.filter((currentId) => currentId !== client.id),
      ],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setError("");
      setSelectedClients([]);
      setFormData({
        numExp: "",
        nig: "",
        clientId: [],
        status: "",
        court:"",
        description: "",
        userId: userId,
      });
    }, 100);
  };

  const handleCreateExpediente = async (e) => {
    e.preventDefault();
    const createExpediente = await createNewExpediente(formData);
    if(!createExpediente.success) {
      setError(createExpediente.msg);
      return
    }
    setFormData({
      numExp: "",
      nig: "",
      clientId: [],
      status: "",
      court:"",
      description: "",
      userId: userId,
    });
    close();
    setError("");
    setSelectedClients([]);
    return;
  }

  useEffect(() => {
    setOpen(show);
  }, [show]);

  // filtrar clientes por nombre

  const filteredClients = clients?.filter(
    (client) =>
      client.firstName
        .toLowerCase()
        .includes(clientInputValue.toLowerCase()) ||
      client.lastName.toLowerCase().includes(clientInputValue.toLowerCase())
  );

  const handleSelectClient = (client) => {
    if (selectedClients.includes(client)) return alert("No puedes añadirlo");
    setFormData({ ...formData, clientId: [...formData.clientId, client.id] });
    setSelectedClients([...selectedClients, client]);
    setClientDropdownOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClientDropdownOpened(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form
          onSubmit={handleCreateExpediente}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h1 className="text-2xl font-bold text-cyan-800 mb-3">
                  LexConnect
                </h1>
                <DialogTitle
                  as="h3"
                  className="text-xl text-center font-semibold leading-6 text-gray-900 mb-3"
                >
                  Crear expediente
                </DialogTitle>

                {error && (
                  <div className="flex flex-col items-center mb-5">
                    <p className="w-72 text-sm leading-6 text-gray-500 bg-red-100 p-3 rounded-md">
                      <i
                        className="fa-solid fa-triangle-exclamation mr-2"
                        style={{ color: "#f87171" }}
                      ></i>
                      {error}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="numExp"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Nº de expediente*
                    </label>
                    <input
                      onChange={handleChange}
                      id="numExp"
                      name="numExp"
                      type="text"
                      placeholder="00/0000"
                      className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="nig"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      N.I.G.
                    </label>
                    <input
                      onChange={handleChange}
                      id="nig"
                      name="nig"
                      type="text"
                      placeholder="N.I.G."
                      className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="relative" ref={dropdownRef}>
                    <label
                      htmlFor="clientSearch"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Cliente*
                    </label>
                    <div className="flex items-center border-1.25 border-gray-300 rounded-md px-2 mt-1">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <input
                        id="clientSearch"
                        type="text"
                        value={clientInputValue}
                        onFocus={() => setClientDropdownOpened(true)}
                        onChange={(e) =>
                          setClientInputValue(e.target.value.toLowerCase())
                        }
                        placeholder="Buscar cliente"
                        className="text-sm placeholder:text-gray-500 p-2 outline-none w-full"
                      />
                    </div>

                    {clientDropdownOpened && filteredClients.length > 0 && (
                      <ul className="absolute z-10 bg-gray-200 border border-gray-300 rounded-md mt-1 max-h-52 w-full overflow-y-auto">
                        {filteredClients.map((client) => (
                          <li
                            key={client.id}
                            className="px-4 py-2 text-sm hover:bg-sky-600 hover:text-white cursor-pointer"
                            onClick={() => handleSelectClient(client)}
                          >
                            {`${client.firstName} ${client.lastName}`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Estado*
                    </label>
                    <select
                      id="status"
                      name="status"
                      onChange={handleChange}
                      className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 border-0 bg-transparent py-2.2 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      required
                    >
                      <option
                        disabled
                        selected
                        value=""
                        className="text-gray-400"
                      >
                        Estado
                      </option>
                      <option value="Abierto">Abierto</option>
                      <option value="En preparación">En preparación</option>
                      <option value="En trámite">En trámite</option>
                      <option value="Pendiente resolucion">
                        Pendiente de resolución
                      </option>
                      <option value="Recurrido">Recurrido</option>
                      <option value="Ejecutoria">Ejecutoria</option>
                      <option value="Suspendido">Suspendido</option>
                      <option value="Archivado provisionalmente">
                        Archivado provisionalmente
                      </option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div
                    className={`flex flex-col  ${
                      selectedClients?.length > 0 && "border"
                    } border-gray-300 rounded-md`}
                  >
                    {selectedClients && selectedClients?.length > 0
                      ? selectedClients.map((selectedClient) => (
                          <div
                            className="flex items-center justify-between rounded-md hover:bg-gray-300"
                            key={selectedClient.id}
                          >
                            <p className="p-1 ml-2 text-sm text-gray-700">
                              {selectedClient.firstName +
                                " " +
                                selectedClient.lastName}
                            </p>
                            <BackspaceIcon
                              className="size-4 cursor-pointer mr-3"
                              onClick={() => handleRemoveClient(selectedClient)}
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                  <div className="flex flex-col">
                    <label
                      htmlFor="expedienteDescription"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Descripción
                    </label>
                    <textarea
                      onChange={handleChange}
                      id="expedienteDescription"
                      name="description"
                      placeholder="Descripción del expediente"
                      className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="court"
                      className="text-sm font-medium leading-6 text-gray-900"
                    >
                      Juzgado
                    </label>
                    <input
                      onChange={handleChange}
                      id="court"
                      name="court"
                      type="text"
                      placeholder="Juzgado"
                      className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-12 flex flex-col items-center mt-2">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 sm:w-72"
                  >
                    Añadir expediente
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
};
