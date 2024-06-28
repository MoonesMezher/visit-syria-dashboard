import axios from 'axios';
import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const notify = () => toast.error("Email or Password are incorrect");
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const headers = {
            'Content-Type': 'application/json'
        };

        const data = {
            email: email,
            password: password
        };

        axios.post('http://127.0.0.1:8000/api/auth/login', data,{headers})
            .then(response =>{
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('id', response.data.user.id);
                    navigate('/home');
                }
            }).catch(error => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    notify();
                } else {
                    console.log(error);
                }
            });
    }   
    return (
        <section className="login-page">
            <div className="form-container">
                <div className="site-name">
                    <h1><span>Visit</span> Syria</h1>
                </div>
                <div className="hello-text">
                    <p>visit Syria مرحبا بكم في لوحة تحكم </p>
                </div>
                <form >
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='البريد الالكتروني' />
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='كلمة المرور ' />
                    <button type='submit' onClick={(e)=>handleLogin(e)}>دخول</button>
                </form>
            </div>
        </section>
    )
}

export default Login

