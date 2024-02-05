import React, { useState } from 'react';
import axios from 'axios';
import "./RegisterModal.scss";

const Register = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email.includes('@')) {
            setErrors('Please enter a valid email address.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/register', formData);
            alert('Registration successful!');
            closeModal();
        } catch (error) {
            console.error('Registration error:', error.response.data);
            setErrors(error.response.data);
        }
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <button onClick={closeModal} className="close-btn" aria-label="Close">X</button>
                <h2>Register</h2>
                {errors && <p style={{ color: 'red' }}>{errors}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;