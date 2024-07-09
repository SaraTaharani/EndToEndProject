import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App'
import { postNewObject } from '../../Fetch';

function ClientRegistration({ setUserData }) {

    const UserData = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone1: '',
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleRegister = () => {

        fetch(`http://localhost:3000/clientRegistration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
            });
        
    }
    return (
        <>
            <div>
                <h1>רישום לקוחה</h1>
                <form>
                    <br />
                    <div>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder='שם פרטי ושם משפחה'
                                value={formData.name}
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <div>
                            <input
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
                            <input
                                type="text"
                                name="phone1"
                                placeholder='מספר טלפון'
                                value={formData.phone1}
                                onChange={changeHandler}
                            />
                        </div>

                        <br />
                        <div>
                            <input
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
                            <input
                                type="password"
                                name="password"
                                placeholder="אימות סיסמא"
                                required
                            />
                        </div>
                        <br />
                        <button type="button" onClick={() => handleRegister()}>
                            שמור
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ClientRegistration
