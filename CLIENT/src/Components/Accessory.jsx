import React, { useState } from 'react';
import '../css/public.css';
import GenericChanges from '../Components/GenericChanges'; 
const Accessory = ({ accessory ,handleSave}) => {
    const [updateAccessory, setUpdateAccessory,] = useState({
        id: accessory.id,
        type: accessory.type,
    })
    return (
        <div className="accessory-container">
            <h3 className="accessory-id">אביזר מספר {accessory.id}</h3>
            <p className="accessory-type">{accessory.type}</p>
            <GenericChanges
                formData={updateAccessory}
                attributesArrHe={["סוג"]}
                attributesArrEn={["type"]}
                handleSave={handleSave}
                func="update"
            />
            {/* <GenericChanges
                formData={updateAccessory}
                attributesArrEn={[]}
                handleSave={handleSave}
                func="delete" /> */}
        </div>
    );
}

export default Accessory;
