import { create } from 'zustand'
import { fetchWrapper } from '../utils/fetchwrapper';

export const useExpedientesStore = create(
    (set, get) => ({
        expedientes: [],

        getExpedientes: async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/user/casefiles`
                const resp = await fetchWrapper(url, {
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
                set({ expedientes: data });
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
                const url = `${import.meta.env.VITE_BACKEND_URL}/user/casefiles`
                const resp = await fetchWrapper(url, {
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
                set({ expedientes: data });
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