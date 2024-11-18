import { useUserStore } from "../store/userDataStore";

export const fetchWrapper = async (url, options = {}) => {
    const { accessToken, getNewAccessToken, setAccessToken } = useUserStore.getState();

    let resp = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(resp.status === 403) {
        try {
            const newAccessToken = await getNewAccessToken();
            setAccessToken(newAccessToken)
            resp = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newAccessToken}`
                }
            });
        } catch (error) {
            console.error('Error al refrescar el token', error);
            throw error;
        }
    }
    return resp;
}; 