export const postStressInfo = async weightGoal => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/activity/userSolution';
    const currentDate = new Date();
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                weightGoal,
                startAt: currentDate.toISOString(), // 시작 날짜를 현재 날짜로 설정합니다.
            }),
        });
        if (!response.ok) throw new Error('bad server condition');
        return true;
    } catch (e) {
        console.error('postLoginToken Error: ', e.message);
        return false;
    }
};