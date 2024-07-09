import React from 'react';
import '../css/public.css'; 


const Turn = ({ turn }) => {
    return (
        <div>
            <h3>פרטי התור</h3>
            <p> תאריך{turn.date}</p>
            <p>שעה: {turn.hour}:{turn.minutes}</p>
            <p>סוג התור :{turn.type}</p>
        </div>
    );
};

export default Turn;
