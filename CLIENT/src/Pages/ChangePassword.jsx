import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataByEmail } from '../../Fetch';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
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

    const sendEmail = async (e) => {
        e.preventDefault();
      
            if (formData.email) {
                const data = await getDataByEmail("changePassword", formData.email);
                if (data){
                    alert('נשלח לך מייל');
                    navigate('/logIn');
                }
            }
       
    };
    return (
        <div>
            <h1>שינוי סיסמה</h1>
            <form>
                <div>
                    <input
                        placeholder='email'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {showPassword &&
                        <input
                            placeholder='password'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />}
                </div>
                <button type="submit" onClick={sendEmail}>
                    שלח
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
