"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import  { useUserStore } from "../../store/userDataStore"

export const Register = ({ show, close }) => {
  const registerFunc = useUserStore((state) => state.registerUser)
  const loginFunc = useUserStore((state) => state.loginUser)
  const navigate = useNavigate();

  const [open, setOpen] = useState(show);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [passwordValidationErr, setPasswordValidationErr] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  // -------------Funciones----------------
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (formData.password != confirmPassword) {
      setPasswordValidationErr(true);
      return null;
    }
    const reg = await registerFunc(formData);
    if (!reg.success) {
      setError(reg.msg)
      return
    }
    setFormData({ email: "", password: "", first_name: "", last_name: "" });
    close();
    setError('')
    navigate("/Clientes");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const login = await loginFunc(formData);
    if (!login.success) {
      setError(login.msg);
      return;
    } 
    setFormData({ email: "", password: "", first_name: "", last_name: "" });
    close();
    setError("");
    navigate("/Clientes");
    return;
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setFormData({ email: "", password: "", first_name: "", last_name: "" });
      setOpenRegisterForm(false);
      setError("")
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
          onSubmit={openRegisterForm ? handleRegisterSubmit : handleLoginSubmit}
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
                      LexiGest
                    </h1>
                  </div>
                  <DialogTitle
                    as="h3"
                    className="text-xl text-center font-semibold leading-6 text-gray-900"
                  >
                    {!openRegisterForm ? "Inicar sesión" : "Regístrate"}
                  </DialogTitle>
                  <div className="mt-1">
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                      {error ? (
                        <div className="sm:col-span-12 flex flex-col items-center">
                          <p className="w-72 text-sm leading-6 text-gray-500  bg-red-100 p-3 rounded-md">
                            {/* <i className="fa-solid fa-circle-exclamation mr-2" style={{color: "#f87171"}}></i> */}
                            <i className="fa-solid fa-triangle-exclamation mr-2" style={{color: "#f87171"}}></i>
                            {error}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="sm:col-span-12 flex flex-col items-center">
                        <label
                          htmlFor="email"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <input
                          onChange={handleChange}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                      {!openRegisterForm ? (
                        ""
                      ) : (
                        <>
                          <div className="sm:col-span-12 flex flex-col items-center">
                            <label
                              htmlFor="first_name"
                              className="block w-72 text-sm font-medium leading-6 text-gray-900"
                            >
                              Nombre
                            </label>
                            <input
                              onChange={handleChange}
                              id="first_name"
                              name="first_name"
                              type="text"
                              placeholder="Nombre"
                              className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              required
                            />
                          </div>
                          <div className="sm:col-span-12 flex flex-col items-center">
                            <label
                              htmlFor="last_name"
                              className="block w-72 text-sm font-medium leading-6 text-gray-900"
                            >
                              Apellidos
                            </label>
                            <input
                              onChange={handleChange}
                              id="last_name"
                              name="last_name"
                              type="text"
                              placeholder="Apellidos"
                              className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              required
                            />
                          </div>
                        </>
                      )}
                      <div className="sm:col-span-12 flex flex-col items-center">
                        <label
                          htmlFor="password"
                          className="block w-72 text-sm font-medium leading-6 text-gray-900"
                        >
                          Contraseña
                        </label>
                        <input
                          onChange={handleChange}
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Contraseña"
                          className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                      {!openRegisterForm ? (
                        ""
                      ) : (
                        <>
                          <div className="sm:col-span-12 flex flex-col items-center">
                            <label
                              htmlFor="newPassword"
                              className="block w-72 text-sm font-medium leading-6 text-gray-900"
                            >
                              Repetir contraseña
                            </label>
                            <input
                              onChange={handleConfirmPasswordChange}
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              placeholder="Repetir contraseña"
                              className="block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 w-72 border-0 bg-transparent py-1.5 pl-2 mt-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {passwordValidationErr ? (
                            <div className="sm:col-span-12 flex flex-col items-center">
                              <p className="w-72 text-sm text-gray-500 bg-gray-200 p-3 rounded-md">
                                Las contraseñas deben coincidir.
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                      <div className="sm:col-span-12 flex flex-col items-center mt-2">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-900 sm:w-72"
                        >
                          {!openRegisterForm ? "Iniciar sesión" : "Regístrate"}
                        </button>
                      </div>
                      <div className="sm:col-span-12 flex flex-col items-center mb-3">
                        <p className="block w-72 text-sm leading-6 text-gray-500 cursor-pointer">
                          {!openRegisterForm ? "¿Has olvidado tu contraseña?" : ""}
                        </p>
                        <p
                          htmlFor="email"
                          className="block w-72 text-sm leading-6 text-gray-500 cursor-pointer"
                          onClick={() => setOpenRegisterForm(!openRegisterForm)}
                        >
                          {!openRegisterForm
                            ? "¿Aún no tienes cuenta?"
                            : "¿Ya tienes cuenta?"}
                        </p>
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
  );
};
