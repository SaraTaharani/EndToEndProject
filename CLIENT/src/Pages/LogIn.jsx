import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../css/login.css'


const LogIn = ({ setUserData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/logIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to log in. Please try again.');
            }

            const data = await response.json();
            const user = JSON.parse(data.user);
            setUserData(user);
            navigate('/');
            alert('Logged in successfully!');
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error.message);
        }
    }

    return (

        <div className="login-container">
        <h1 className="login-heading">התחבר</h1>
        <form className="login-form">
            <div className="login-input-container">
                <input
                    className="input"
                    placeholder='כתובת המייל שלך'
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="login-input-container">
                <input
                    className="input"
                    placeholder='הסיסמא שלך'
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button className="login-button" type="button" onClick={handleSubmit}>
                התחבר
            </button>
            <NavLink className="login-forgot-password" to="/ChangePassword">
             שכחת סיסמה
            </NavLink>
        </form>
    </div>
    );
}

export default LogIn
