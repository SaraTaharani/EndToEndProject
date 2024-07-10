import React, { useState, useEffect } from 'react';
import GenericChanges from '../Components/GenericChanges';
import Accessory from '../Components/Accessory';
import '../css/public.css'; 
import { getData, postNewObject, deleteObject, updateObject } from '../../Fetch';

const Accessories = () => {
    const [accessories, setAccessories] = useState([]);
    const accessoryData = {
        type: ""
    }
    useEffect(() => {
        getData("accessories")
            .then(data => {
                setAccessories([...data])
            });
    }, []);

    const handleSave = (accessory, func) => {
        switch (func) {
            case 'add':
                postNewObject("accessories", accessory)
                    .then(data => {
                        setAccessories([...data])
                    });
                break;
            case 'update':
                updateObject("accessories", accessory.id, accessory)
                    .then(data => {
                        setAccessories([...data])
                    });
                break;
      
            default:
                break;
        }
    };
    return (
        <>
            <h2 className="accessories-title">אביזרים</h2>
            <GenericChanges
                formData={accessoryData}
                attributesArrHe={["סוג האביזר"]}
                attributesArrEn={["type"]}
                handleSave={handleSave}
                func="add"
            />
            <div className="accessories-container">
                {accessories.map((accessory, index)=> <Accessory key={index} accessory={accessory} handleSave={handleSave}/>)}
            </div>
        </>
    );
}

export default Accessories;
