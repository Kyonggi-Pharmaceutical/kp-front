import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import Nav from '../components/Nav';
import { postLoginToken } from '../api/postLoginToken';

export default function Activities(props) {
    const navigate = useNavigate();



    return (
        <div>
            <h1>Goggle Login</h1>
            <Nav />

        </div>
    );
}
