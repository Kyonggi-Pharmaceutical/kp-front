import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUserInfo } from '../api/getUserInfo';

export default function MyPage({ isLogin }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    stressPoint: 0,
  });

  useEffect(() => {
    if (!isLogin) {
      alert("no");
      navigate('/mypage')
    };

    const initUserinfo = async () => {
      const newinfo = await getUserInfo();
      setInfo(newinfo);
    };
    initUserinfo();
  }, [isLogin]);

  return (
    <div className="main-bg">
      <div className="main">
        <h1>mypage</h1>
        <p>Welcome To MyPage</p>
        <p>email: {info.email}</p>
        <p>name: {`${info.lastName} ${info.firstName}`}</p>
      </div>
    </div>
  );
}
