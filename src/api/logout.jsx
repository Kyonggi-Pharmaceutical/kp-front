export const logout = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/login/oauth/google';
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'DELETE',
            credentials: 'include' // include, *same-origin, omit
        });
        if (!response.ok) throw new Error('bad server condition');
        return true;
    } catch (e) {
        console.error('postLoginToken Error: ', e.message);
        return false;
    }
};
