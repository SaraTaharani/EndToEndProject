import React, { useState } from 'react';
// import '../css/contact.css'; // Updated to use a specific CSS file for Contact Us page
import '../css/ContactUs.css';
import {  postNewObject } from '../../Fetch';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        postNewObject("ContactUs", formData)
                    .then(data => {
                        if(data){
                         alert('פרטיך נשלחו בהצלחה נחזור אליך בהקדם')
                        }
                    });
    };

    return (
        <div className="contact-us-page">
            <h1>צור קשר</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>
                        שם:
                        <input
                            type="text"
                            name="name"
                            placeholder='שם'
                            value={formData.name}
                            onChange={changeHandler}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        כתובת מייל:
                        <input
                            type="email"
                            name="email"
                            placeholder='כתובת מייל'
                            value={formData.email}
                            onChange={changeHandler}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        מספר פלאפון:
                        <input
                            type="tel"
                            name="phone"
                            placeholder='פלאפון'
                            value={formData.phone}
                            onChange={changeHandler}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        סגנון שמלה שחלמת:
                        <input
                            type="text"
                            name="dressStyle"
                            placeholder='סגנון שמלה שחלמת...'
                            value={formData.dressStyle}
                            onChange={changeHandler}
                            className="form-input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        איך הגעת אלינו??? נשמח לשמוע:
                        <input
                            type="text"
                            name="remarks"
                            placeholder='איך הגעת אלינו??? נשמח לשמוע'
                            value={formData.remarks}
                            onChange={changeHandler}
                            className="form-input"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">אישור</button>
            </form>
        </div>
    );
}

export default ContactUs;