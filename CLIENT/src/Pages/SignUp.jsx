import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from '../App'
import { postNewObject } from '../../Fetch';
import '../css/signUp.css'
import '../css/login.css'
function SignUp({ setUserData }) {

    const UserData = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone1: '',
        dressStyle: '',
        remarks: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSignUp = () => {

        fetch(`http://localhost:3000/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },credentials: "include",
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                alert('המשתמש קיים');
                navigate('/logIn');
            });
        
    }
    return (
        <>
            <div>
                <h1>Sign Up</h1>
                <form>
                    <br />
                    <div>
                        <div>
                            <input  className="input"
                                type="text"
                                name="name"
                                placeholder='שם פרטי ושם משפחה'
                                value={formData.name}
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <div>
                            <input  className="input"
                                type="email"
                                name="email"
                                placeholder='כתובת מייל'
                                value={formData.email}
                                required
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <div>
                            <input  className="input"
                                type="text"
                                name="phone1"
                                placeholder='מספר טלפון'
                                value={formData.phone1}
                                onChange={changeHandler}
                            />
                        </div>

                        <br />
                        <div>
                            <input  className="input"
                                type="password"
                                name="password"
                                placeholder="סיסמא"
                                required
                                value={formData.password}
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <div>
                            <input  className="input"
                                type="password"
                                name="password"
                                placeholder="אימות סיסמא"
                                required
                            />
                        </div>
                        <br />
                       
                        <br />
                        <button type="button" onClick={() => handleSignUp()}>
                            שמור
                        </button>
                    </div>
                </form>
                
            </div>
        </>
    )
}

export default SignUp
