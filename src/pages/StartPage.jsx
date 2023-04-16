import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/getUserInfo';

export default function StartPage({ isLogin }) {
    const navigate = useNavigate();

    useEffect( ()=>{
        if (!isLogin) navigate('/');

    })



}