export const authService = {
    getNewAccessToken: async() => {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/refresh', {
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
        
        return newAccessToken
    }
};