import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUserInfo } from '../api/getUserInfo';

export default function MyPage({ isLogin }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    nickname: "",
    gender: "",
    dateOfBirth: "",
    height: 0.0,
    weight: 0.0,
    mbti: "",
    isSmoking: null,
    isAlcohol: null,
    HealthcareType: null,
  });

  useEffect(() => {
    if (!isLogin) {
      alert("no");
      navigate('/')
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
        <h3 className="small-title">My Page</h3>
        <p>Welcome To MyPage</p>
        <p>email: {info.email}</p>
        <p>nickname: {info.nickname}</p>
        <p>gender : {info.gender}</p>
        <p>name: {`${info.lastName} ${info.firstName}`}</p>
      </div>
    </div>
  );
}
