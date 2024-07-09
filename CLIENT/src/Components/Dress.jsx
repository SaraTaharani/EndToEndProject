import React, { useState } from 'react';
import GenericChanges from './GenericChanges';
import '../css/dress.css'; // Import the CSS file

const Dress = ({ dress, handleSave }) => {
    const [updateDress, setUpdateDress] = useState({
        id: dress.id,
        model: dress.model,
        price: dress.price,
        uses: dress.uses,
        advancePayment: dress.advancePayment
    });
    
    return (
        <div className="dress-container">
            <div className="dress-details">
                <h3>שמלה מספר :{dress.id}</h3>
                <p>שם שמלה :{dress.model}</p>
                <p>מחיר :{dress.price}</p>
                <p>שימושים :{dress.uses}</p>
                <p>מחיר מקדמה :{dress.advancePayment}</p>
            </div>
            <div className="dress-actions">
                <GenericChanges
                    formData={updateDress}
                    attributesArrHe={["מודל", "מחיר", "מספר פעמים שהיתה השמלה בשימוש", "מיקדמה"]}
                    attributesArrEn={["model", "price", "uses", "advancePayment"]}
                    handleSave={handleSave}
                    func="update"
                />
                <GenericChanges
                    formData={updateDress}
                    attributesArrEn={[]}
                    handleSave={handleSave}
                    func="delete"
                />
            </div>
        </div>
    );
}

export default Dress;
