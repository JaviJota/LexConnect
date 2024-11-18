"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userDataStore";
import { useClientsStore } from "../../../store/ClientDataStore";
import { useDeudasStore } from "../../../store/deudaDataStore";
import { useExpedientesStore } from "../../../store/expedienteDataStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const AddDeuda = ({ show, close }) => {
  const userDataFromStore = useUserStore((state) => state.userData);
  const client = useClientsStore((state) => state.currentClient);
  const createDeudaFunc = useDeudasStore((state) => state.addDeuda)
  
  const [open, setOpen] = useState(show);
  const [caseFileDropdownOpened, setCaseFileDropdownOpened] =
  useState(false);
  
  const userData =
  userDataFromStore || JSON.parse(localStorage.getItem("lexigestUserData"));
  const userId = userData?.user?.id;
  const [clientId, setClientId] = useState(null)
  const [error, setError] = useState("");
  const [caseFileInputValue, setcaseFileInputValue] = useState("");
  
  const [formData, setFormData] = useState({
    amount: "",
    concept: "",
    caseFileId: null,
  });
  useEffect(() => {
    if (client) {
      setClientId(client.id);
    }
  }, [client, userId]); 
  const dropdownRef = useRef(null);

  const filteredCaseFiles = client?.CaseFiles?.filter((caseFile) =>
    caseFile.numExp
      .toLowerCase()
      .includes(caseFileInputValue.toLowerCase())
  );

  const handleSelectcaseFile = (caseFile) => {
    setcaseFileInputValue(caseFile.numExp)
    setFormData({
      ...formData,
      caseFileId: caseFile.id,
    });
    setCaseFileDropdownOpened(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCaseFileDropdownOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateDeuda = async (e) => {
    e.preventDefault();
    const createDeuda = await createDeudaFunc(formData, clientId);
    if(!createDeuda.success) {
      setError(createDeuda.msg);
      return;
    }

    setFormData({
      amount: "",
      concept: "",
      caseFileId: null,
      userId: userId,
      clientId: client?.id || null,
    });
    setcaseFileInputValue("")
    close();
    setError("");
    return;
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setFormData({
        amount: "",
        concept: "",
        caseFileId: null,
        userId: userId,
        clientId: client?.id || null,
      });
      setcaseFileInputValue("")
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
          onSubmit={handleCreateDeuda}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
                    Crear deuda
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
                          htmlFor="amount"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Cantidad*
                        </label>
                        <input
                          onChange={handleChange}
                          id="amount"
                          name="amount"
                          type="number"
                          placeholder="100"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-around mb-5">
                      <div
                        className="relative sm:col-span-12 flex flex-col items-center mb-5 sm:mb-0"
                        ref={dropdownRef}
                      >
                        <label
                          htmlFor="clientSearch"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Expediente*
                        </label>
                        <div className="flex items-center rounded-md px-2 mt-1">
                          <input
                            id="clientSearch"
                            type="text"
                            value={caseFileInputValue}
                            onFocus={() => setCaseFileDropdownOpened(true)}
                            onChange={(e) =>
                              setCaseFileInputValue(
                                e.target.value.toLowerCase()
                              )
                            }
                            placeholder="Buscar caseFile"
                            className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            autoComplete="off"
                          />
                        </div>

                        {/* Dropdown de caseFiles */}
                        {caseFileDropdownOpened &&
                          filteredCaseFiles.length > 0 && (
                            <ul className="absolute z-10 bg-gray-200 border border-gray-300 rounded-md top-full mt-1 max-h-32 w-full overflow-y-auto">
                              {filteredCaseFiles.map((caseFile) => (
                                <li
                                  key={caseFile.id}
                                  className="px-4 py-2 text-sm hover:bg-sky-600 hover:text-white cursor-pointer"
                                  onClick={() =>
                                    handleSelectcaseFile(caseFile)
                                  }
                                >
                                  {caseFile.numExp}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-around mb-5">
                      <div className="sm:col-span-12 flex flex-col items-center mb-5 sm:mb-0">
                        <label
                          htmlFor="concept"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Concepto*
                        </label>
                        <input
                          onChange={handleChange}
                          id="concept"
                          name="concept"
                          type="text"
                          placeholder="Concepto"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          maxLength={50}
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-12 flex flex-col items-center mt-2">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 sm:w-72"
                      >
                        Añadir deuda
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
