export const postLoginToken = async idToken => {  //서버에 사용자가 로그인하여 생성된 인증 토큰을 보냄
  const API_URL = process.env.REACT_APP_API_URL;
  const path = '/api/v1/login/oauth/google';

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      credentials: 'include', // include, *same-origin, omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idToken), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    if (!response.ok) throw new Error('bad server condition');
    return true;
  } catch (e) {
    console.error('postLoginToken Error: ', e.message);
    return false;
  }
};