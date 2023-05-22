export const getDailyProgress = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/health/checkedMyProgress'; // 경로 수정
    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',

        });
        if (!response.ok) throw new Error('bad server condition');
        return response.json();
    } catch (e) {
        console.error('getDailyProgress Error: ', e.message);
        return false;
    }
};




