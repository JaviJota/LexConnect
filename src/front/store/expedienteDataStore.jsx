import { create } from 'zustand'

export const useExpedientesStore = create(
    (set, get) => ({
        expedientes: [],

        getExpedientes: async (id) => {
            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/users/${id}/expedientes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    }
                });
                const data = await resp.json()
                if(!resp.ok){
                    const errorMsg = data.msg;
                    throw new Error(errorMsg)
                };
                set({ expedientes: data.expedientes });
                return ({ success: true })
            } catch (error) {
                if(
                    error.name === 'TypeError' &&
                    error.message === 'Failed to fetch'
                ){
                    console.error("Servidor no disponible", error.message);
                    return {
                        success: false,
                        msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde."
                    };
                };
                console.error('Error al recuperar expedientes');
                return ({ success: false, msg: error.message })
            }
        },
        addExpediente: async (formData) => {
            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/expedientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await resp.json()
                if(!resp.ok) {
                    const errorMsg = data.msg;
                    throw new Error(errorMsg);
                }
                set({ expedientes: data.expedientes });
                return ({ success: true })
            } catch (error) {
                if(error.name === "TypeError" && error.message === "Failed to fetch"){
                    console.error("Servidor no disponible", error.message);
                    return {
                        success: false,
                        msg: "Ups, parece que algo salió mal, inténtelo de nuevo más tarde.",
                    };
                };
                console.error("Error al crear expediente", error.message);
                return { success: false, msg: error.message }
            }
        },
    })
);