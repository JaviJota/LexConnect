import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {},
      accessToken: null,

      setAccessToken: (token) => set({ accessToken: token }),
      getNewAccessToken: async() => {
          const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/refresh-token', {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
                  accept: 'application/json',
              }
          });
          if(!resp.ok) {
              throw new Error('Failed to authenticate.');
          };

          const data = await resp.json();
          const newAccessToken = data.accessToken;
          set({ accessToken: newAccessToken });
          
          return newAccessToken
      },
      registerUser: async (formData) => {
        try {
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify(formData),
              credentials: 'include',
            }
          );
          const data = await resp.json();
          if (!resp.ok) {
            const errorMsg = data.msg;
            throw new Error(errorMsg);
          }
          set({ 
            userData: data.user,
            accessToken: data.accessToken
          });
          return { success: true };
        } catch (error) {
          if (
            error.name === "TypeError" &&
            error.message === "Failed to fetch"
          ) {
            console.error("Servidor no disponible", error.message);
            return {
              success: false,
              msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
            };
          }
          console.error("Error al registrar nuevo usuario.", error.message);
          return { success: false, msg: error.message };
        }
      },
      loginUser: async (formData) => {
        try {
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify(formData),
              credentials: 'include',
            }
          );
          const data = await resp.json();
          if (!resp.ok) {
            const errorMsg = data.msg
            throw new Error(errorMsg);
          }
          
          set({ 
            userData: data.user,
            accessToken: data.accessToken
          });
          return { success: true };
        } catch (error) {
          if(error.name === 'TypeError' && error.message === 'Failed to fetch'){
            console.error('Servidor no disponible', error.message)
            return {success: false, msg:"Ups, parece que algo salió mal, inténtelo de nuevo más tarde."}
          }
          console.error("Error al inicar sesión.", error.message);
          return {success: false, msg: error.message}
        }
      },
      logoutUser: async () => {
        try {
          await fetch(import.meta.env.VITE_BACKEND_URL + '/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
            credentials: 'include',
          });
          set({ 
            userData: null,
            accessToken: null
           });
        } catch (error) {
          console.error("Error al intentar cerrar sesión:", error.message);
        }
      },
    }),
    {
      name: "lexigestUserData",
      partialize: (state) => ({ userData:state.userData })
    }
  )
);
