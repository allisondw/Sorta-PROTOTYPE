import React, { useState } from 'react';
import axios from 'axios';
import "./LoginModal.scss";

const Login = ({ closeModal, onSwitchToRegister, onSuccessfulLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', credentials);
            console.log(response.data); 
            onSuccessfulLogin(response.data.user);
        } catch (error) {
            console.error('Login error:', error.response.data);
            setErrors(error.response.data);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={closeModal} className="close-btn" aria-label="Close">X</button>
                <h2>Login</h2>
                {errors && <p style={{ color: 'red' }}>{errors}</p>}
                <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                </form>
                <button onClick={onSwitchToRegister}>Sign up</button>
            </div>
        </div>
    );
};

export default Login;
