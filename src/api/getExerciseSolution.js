export const getExerciseSolution = async ()=>{
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/exercises/exercisesSolution';

    // try {
    //     const response = await fetch(`${API_URL}${path}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //         },
    //         credentials: 'include',
    //     });
    //     if (!response.ok) throw new Error('bad server condition');
    //     return response.json();
    // } catch (e) {
    //     console.error('exercise solution error : ', e.message);
    //     return false;
    // }
}