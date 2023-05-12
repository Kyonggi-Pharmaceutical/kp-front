
export const saveDailyChecked = async isCheck => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/health/dailyProgressChecked';
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isCheck),
            isCheck: true,
        });
        if (!response.ok) throw new Error('bad server condition');
        return true;
    } catch (e) {
        console.error('saveDailyChecked Error: ', e.message);
        return false;
    }
};