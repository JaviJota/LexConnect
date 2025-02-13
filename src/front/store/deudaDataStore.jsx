import { create } from 'zustand'
import { fetchWrapper } from '../utils/fetchwrapper';

export const useDeudasStore = create(
    (set, get) => ({
        deudas: [],
        pagos: [],

        getDeudas: async (id) => {
            try {
              const url = `${import.meta.env.VITE_BACKEND_URL}/clients/${id}/debts`
                const resp = await fetchWrapper(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    }
                });
                if (resp.status === 204) {
                  console.log('No se ha encontrado ninguna deuda');
                  set({ deudas: [] }); // Podrías establecer un array vacío si no hay deudas
                  return { success: true, msg: "No se ha encontrado ninguna deuda" };
                }
                const data = await resp.json();
                if (!resp.ok) {
                    const errorMsg = data.msg;
                    throw new Error(errorMsg);
                }
                set({ deudas: data })
                return ({ success: true})
            } catch (error) {
                if(
                    error.name === "TypeError" &&
                    error.message === "Failed to fetch"
                ) {
                    console.error("Servidor no disponible", error.message);
                    return {
                        success: false,
                        msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
                    };
                }
                console.error("Error al recuperar deudas", error.message);
                return { success: false, msg: error.message }
            }
        },
        addDeuda: async (formData, id) => {
            try {
              const url = `${import.meta.env.VITE_BACKEND_URL}/clients/${id}/debts`
              const resp = await fetchWrapper(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                  },
                  body: JSON.stringify(formData),
                }
              );
              const data = await resp.json();
              if (!resp.ok) {
                const errorMsg = data.msg;
                throw new Error(errorMsg);
              }
              set({ deudas: data })
              return { success: true };
            } catch (error) {
              if (error.name === "TypeError" && error.message === "Failed to fetch") {
                console.error("Servidor no disponible", error.message);
                return {
                  success: false,
                  msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
                };
              }
              console.error("Error al crear deuda.", error.message);
              return { success: false, msg: error.message };
            }
        },
        deleteDeuda: async (id) => {
          try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/debts/${id}`
            const resp = await fetchWrapper(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
              }
            );
            const data = await resp.json();
            if (!resp.ok) {
              const errorMsg = data.msg;
              throw new Error(errorMsg);
            }
            set({ deudas: data.clientDebts })
            return { success: true };
          } catch (error) {
            if (error.name === "TypeError" && error.message === "Failed to fetch") {
              console.error("Servidor no disponible", error.message);
              return {
                success: false,
                msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
              };
            }
            console.error("Error al eliminar deuda.", error.message);
            return { success: false, msg: error.message };
          }
        },
        deletePago: async (id) => {
          try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/payments/${id}`
            const resp = await fetchWrapper(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
              }
            );
            const data = await resp.json();
            if (resp.status === 404) {
              set({ pagos: [] })
            }
            if (!resp.ok) {
              const errorMsg = data.msg;
              throw new Error(errorMsg);
            }
            set({ pagos: data })
            return { success: true };
          } catch (error) {
            if (error.name === "TypeError" && error.message === "Failed to fetch") {
              console.error("Servidor no disponible", error.message);
              return {
                success: false,
                msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
              };
            }
            console.error("Error al eliminar pago.", error.message);
            return { success: false, msg: error.message };
          }
        },
        deudaToPago: async (id) => {
            try {
              const url = `${import.meta.env.VITE_BACKEND_URL}/payments/${id}`
              const resp = await fetchWrapper(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  accept: 'application/json'
                },
              });
              const data = await resp.json();
              if(!resp.ok){
                const errorMsg = data.msg;
                throw new Error(errorMsg);
              };
              set({ deudas: data.debts });
              set({ pagos: data.payments });
            } catch (error) {
              if(error.name === 'TypeError' && error.message === "Failed to fetch") {
                console.error("Servidor no disponible", error.message);
                return {
                  success: false,
                  msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
                };
              }
              console.error("Error al asignar pago", error.message);
              return { success: false, msg: error.message };
            }
        },
        getPagos: async (id) => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/client/${id}/payments`
                const resp = await fetchWrapper(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    }
                });
                if (resp.status === 204) {
                  console.log('No se ha encontrado ningún pago');
                  set({ deudas: [] }); // Podrías establecer un array vacío si no hay deudas
                  return { success: true, msg: "No se ha encontrado ningún pago" };
                }
                const data = await resp.json();
                if (!resp.ok) {
                    const errorMsg = data.msg;
                    throw new Error(errorMsg);
                }
                set({ pagos: data })
                return ({ success: true})
            } catch (error) {
                if(
                    error.name === "TypeError" &&
                    error.message === "Failed to fetch"
                ) {
                    console.error("Servidor no disponible", error.message);
                    return {
                        success: false,
                        msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
                    };
                }
                console.error("Error al recuperar pagos", error.message);
                return { success: false, msg: error.message }
            }
        },
    })
);