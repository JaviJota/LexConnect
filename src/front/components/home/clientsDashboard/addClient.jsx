"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userDataStore";
import { useClientsStore } from "../../../store/ClientDataStore";

export const AddClient = ({ show, close }) => {
  const createNewClient = useClientsStore((state) => state.addClient)
  const userDataFromStore = useUserStore((state) => state.userData);
  const [open, setOpen] = useState(show);

  const userData = userDataFromStore || JSON.parse(localStorage.getItem('lexigestUserData'));
  const userId = userData?.user?.id;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientPhoneNumber: "",
    clientDescription: "",
    userId: userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const createClient = await createNewClient(formData);
    if(!createClient.success) {
      setError(createClient.msg);
      return;
    }

    setFormData({
      clientFirstName: "",
      clientLastName: "",
      clientEmail: "",
      clientPhoneNumber: "",
      clientDescription: "",
      userId: userId,
    });
    close();
    setError("");
    return;
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setFormData({
        clientFirstName: "",
        clientLastName: "",
        clientEmail: "",
        clientPhoneNumber: "",
        clientDescription: "",
        userId: userId,
      });
      setError("");
    }, 100);
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form
          onSubmit={handleCreateClient}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
                    className="text-xl text-center font-semibold leading-6 text-gray-900 mb-3"
                  >
                    Crear cliente
                  </DialogTitle>
                  <div className="mt-1">
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
                    <div className="flex flex-col sm:flex-row justify-around mb-5">
                      <div className="sm:col-span-12 flex flex-col items-center mb-5 sm:mb-0">
                        <label
                          htmlFor="clientFirstName"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Nombre*
                        </label>
                        <input
                          onChange={handleChange}
                          id="clientFirstName"
                          name="clientFirstName"
                          type="text"
                          placeholder="Nombre"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                      <div className="sm:col-span-12 flex flex-col items-center">
                        <label
                          htmlFor="clientLastName"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Apellidos*
                        </label>
                        <input
                          onChange={handleChange}
                          id="clientLastName"
                          name="clientLastName"
                          type="text"
                          placeholder="Apellidos"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-around mb-5">
                      <div className="sm:col-span-12 flex flex-col items-center mb-5 sm:mb-0">
                        <label
                          htmlFor="clientEmail"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <input
                          onChange={handleChange}
                          id="clientEmail"
                          name="clientEmail"
                          type="email"
                          placeholder="Email"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          
                        />
                      </div>
                      <div className="sm:col-span-12 flex flex-col items-center">
                        <label
                          htmlFor="clientPhoneNumber"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Teléfono
                        </label>
                        <input
                          onChange={handleChange}
                          id="clientPhoneNumber"
                          name="clientPhoneNumber"
                          type="text"
                          placeholder="Teléfono"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-12 flex flex-col sm:ml-9 mb-9">
                      <label
                        htmlFor="clientDescription"
                        className="block w-72 text-sm font-medium leading-6 text-gray-900"
                      >
                        Otros datos
                      </label>
                      <textarea
                        onChange={handleChange}
                        id="clientDescription"
                        name="clientDescription"
                        type="text"
                        className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 border-0 m-0 sm:mr-8 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        
                      />
                    </div>
                    <div className="sm:col-span-12 flex flex-col items-center mt-2">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 sm:w-72"
                      >
                        Añadir cliente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
};
