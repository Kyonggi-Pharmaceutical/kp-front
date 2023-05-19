export const saveUserExercises = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/exercises/saveUserExercise';
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        });
        if (!response.ok) throw new Error('bad server condition');
        return true;
    } catch (e) {
        console.error('saveUserExercises Error: ', e.message);
        return false;
    }
}