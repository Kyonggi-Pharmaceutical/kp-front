export const getMyLikeForComment = async () => {  //서버에 유저 정보 요청
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/likes/getLikedCommentByUser';

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
        console.error('getExerciseInfo Error: ', e.message);
        return false;
    }
};