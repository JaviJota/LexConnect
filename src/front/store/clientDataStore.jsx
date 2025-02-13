import { create } from 'zustand'
import { fetchWrapper } from '../utils/fetchwrapper';

export const useClientsStore = create(
    (set, get) => ({
        clients: [],
        currentClient: {},
        getClients: async (id) => {
          try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}/clients`;

            // fetchWrapper para renovar el accessToken
            const resp = await fetchWrapper(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            });
        
            if (!resp.ok) {
              const errorMsg = (await resp.json()).message;
              throw new Error(errorMsg);
            }
        
            const data = await resp.json();
            set({ clients: data });
            return { success: true };
          } catch (error) {
            console.error("Error al recuperar clientes:", error.message);
        
            return {
              success: false,
              msg:
                error.message === "Failed to fetch"
                  ? "Servidor no disponible. Por favor, inténtelo más tarde."
                  : error.message,
            };
          }
        },
        getClient: async (id) => {
          try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/clients/${id}`;

            const resp = await fetchWrapper(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
              }
            });

            if(!resp.ok) {
              const errorMsg = data.msg;
              throw new Error(errorMsg);
            }

            const data = await resp.json();
            set({ currentClient: data.client })

            return ({ success : true });
          } catch (error) {
            if(
              error.name === "TypeError" &&
              error.message === "Failed to fetch"
            ) {
              console.error("Servidor no disponible, error.message");
              return {
                success: false,
                msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
              };
            };
            console.error("Error al recuperar cliente", error.message);
            return { success: false, msg: error.message }
          }
        },
        addClient: async (formData) => {
            try {
              const url = `${import.meta.env.VITE_BACKEND_URL}/clients`
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
                const errorMsg = (await resp.json()).message;
                throw new Error(errorMsg);
              }
              set({ clients: data.clients })
              return { success: true };
            } catch (error) {
              if (error.name === "TypeError" && error.message === "Failed to fetch") {
                console.error("Servidor no disponible", error.message);
                return {
                  success: false,
                  msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
                };
              }
              console.error("Error al crear cliente.", error.message);
              return { success: false, msg: error.message };
            }
          },
    })
);