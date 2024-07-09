import React, { useState, useEffect } from 'react';
import GenericChanges from '../Components/GenericChanges';
import Dress from '../Components/Dress';
import { getData, postNewObject, deleteObject, updateObject } from '../../Fetch';
import '../css/dress.css'; // Import the CSS file

const Dresses = () => {
    const [dresses, setDresses] = useState([]);
    const dressData = {
        model: "",
        price: "",
        uses: "",
        advancePayment: ""
    }

    useEffect(() => {
        getData("dresses")
            .then(data => {
                setDresses([...data])
            });
    }, []);

    const handleSave = (dress, func) => {
        switch (func) {
            case 'add':
                postNewObject("dresses", dress)
                    .then(data => {
                        setDresses([...data])
                    });
                break;
            case 'update':
                updateObject("dresses", dress.id, dress)
                    .then(data => {
                        setDresses([...data])
                    });
                break;
            case 'delete':
                deleteObject("dresses", dress.id)
                    .then(data => {
                        setDresses([...data])
                    });
                break;
            default:
                break;
        }
    };

    return (
        <div className="dresses-container">
            <GenericChanges
                formData={dressData}
                attributesArrHe={["מודל", "מחיר", "מספר פעמים שהיתה השמלה בשימוש", "מיקדמה"]}
                attributesArrEn={["model", "price", "uses", "advancePayment"]}
                handleSave={handleSave}
                func="add"
            />
            <div className="dresses-list">
                {dresses.map((dress, index) => (
                    <Dress key={index} dress={dress} handleSave={handleSave} />
                ))}
            </div>
        </div>
    );
}

export default Dresses;
