import { create } from 'zustand'

export const useClientsStore = create(
    (set, get) => ({
        clients: [],
        currentClient: {},

        getClients: async (id) => {
            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}/clients`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    }
                });
                const data = await resp.json();
                if (!resp.ok) {
                    const errorMsg = data.msg;
                    throw new Error(errorMsg);
                }
                set({ clients: data.clients });
                return ({ success: true});
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
                console.error("Error al recuperar clientes", error.message);
                return { success: false, msg: error.message }
            }
        },
        getClient: async (id) => {
          try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/client/${id}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
              }
            });
            const data = await resp.json();
            if(!resp.ok) {
              const errorMsg = data.msg;
              throw new Error(errorMsg);
            }
            set({ currentClient: data.client });
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
              const resp = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/clients",
                {
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