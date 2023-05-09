import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

import "./style.css";


const Login = () =>{
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {

        e.preventDefault()

        const loginData = {
        login: login,
        password: password
    }

        axios.post('http://127.0.0.1:5000/user/login', loginData)
            .then(function (response){
            console.log(response);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 'User'){
                navigate("/main");
            } else if (response.data.role === 'Teacher'){
                navigate("/main/teacher");
            }
            })
            .catch(error => {
            alert('Incorrect login or password. Please try again.');
            });
    }

    return(
        <>
            <div className="login">
                <h2>Login</h2>
                <form id="login-form">
                    <label htmlFor="login-input">Username:</label>
                    <input type="text" id="login-input" name="username" placeholder="Enter username" required
                           value={login} onChange={(e) => setLogin(e.target.value)} />
                    <label htmlFor="password-input">Password:</label>
                    <input type="password" id="password-input" name="password" placeholder="Enter password" required
                           value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <input type="submit" value="Login" onClick={handleLogin}/>
                </form>
            </div>
        </>
    );
}

export default Login;
