import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {},

      registerUser: async (formData) => {
        try {
          const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/users/register",
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
          set({ userData: data });
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
            import.meta.env.VITE_BACKEND_URL + "/api/users/login",
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
            const errorMsg = data.msg
            throw new Error(errorMsg);
          }
          
          set({ userData: data });
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
    }),
    {
      name: "lexigestUserData",
    }
  )
);
