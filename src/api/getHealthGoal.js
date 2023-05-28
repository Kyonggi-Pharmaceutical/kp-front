export const getHealthGoal = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const path = '/api/v1/health/health-goal/';

  const response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
        let errorResponse = await response.json();
        let errorMessage = "ERROR: " + errorResponse.errorCode + ' ' + errorResponse.errorMessage;
        throw new Error(errorMessage);
    }
    return response.json();
};
