import React, { useState } from 'react'
import '../css/genericChanges.css';
const GenericChanges = ({ formData,attributesArrHe, attributesArrEn,handleSave, func}) => {
  const [visiblityState, setVisiblityState] = useState(false);
  const [genericFormData, setGenericFormData]=useState(formData);
  const captions={
    add:"הוספה",
    update: "עריכה",
    delete:"מחיקה"
  };
  const handleChange = (event) => {
    const { name, value } = event.target
    setGenericFormData(genericFormData => {
      return {
        ...genericFormData,
        [name]: value
      }
    })
  }
  function handleSaveFunction() {
    handleSave(genericFormData, func );
    setVisiblityState(!visiblityState)
  }
  
  return (
    <div className="generic-changes-container">
    {!visiblityState && (
      <button className='button-options' onClick={() => setVisiblityState(!visiblityState)}>             
        {`${captions[func]}`}
      </button>
    )}
    {visiblityState && (
      <>
        <form className="generic-form">
          {attributesArrEn.map((attribute, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder={attributesArrHe[index]}
                onChange={handleChange}
                name={attribute}
                value={genericFormData[attribute]}
                className="form-input"
              />
              <br />
            </div>
          ))}
        </form>
        <button className="save-button" onClick={handleSaveFunction}>שמור</button>
      </>
    )}
  </div>
  );
};
export default GenericChanges