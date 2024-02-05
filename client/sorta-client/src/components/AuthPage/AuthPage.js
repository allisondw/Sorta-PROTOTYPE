import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AuthPage.scss"; 

const AuthPage = ({ isLogin, onSwitchMode, onSuccessfulLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        firstName: isLogin ? null : '' 
    });
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        try {
            const response = await axios.post(`http://localhost:8080/api/${endpoint}`, credentials);
            if (response.data.user) {
                onSuccessfulLogin(response.data.user);
                navigate('/'); 
            } else {
                console.log("Error logging in");
            }
            console.log(response.data); 
        } catch (error) {
            console.error('Auth error:', error.response.data);
            setErrors(error.response.data);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                {errors && <p className="error">{errors}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={credentials.firstName}
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <button className="switch-btn" onClick={onSwitchMode}>
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
