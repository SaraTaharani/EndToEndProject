import React, { useContext, useEffect, useState } from 'react';
import Order from '../Components/Order';
import { getOrdersOfClient, getTurnsOfClient, updateObject } from '../../Fetch';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Turn from '../Components/Turn';
import '../css/myDetails.css'
import WorkHoursOfEmployee from '../Components/WorkHoursOfEmployee';

const MyDetails = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [myOrders, setMyOrders] = useState([]);
    const [myTurns, setMyTurns] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const userData = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: user.email,
        password: '',
        name: user.name,
        phone1: user.phone1,
        phone2: user.phone2
    });

    useEffect(() => {
        getOrdersOfClient(user.id)
            .then(data => {
                setMyOrders([...data]);
            });
        getTurnsOfClient(user.id)
            .then(data => {
                setMyTurns(data);
            });
    }, []);

    function handleSaveFunction() {
        updateObject("users", user.id, formData)
            .then(data => {
                setFormData({
                    email: data.email,
                    password: '', // Do not update password from server response
                    name: data.name,
                    phone1: data.phone1,
                    phone2: data.phone2
                });
                setShowDetails(false); // Close details after saving
            });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleCancel = () => {
        setShowDetails(false); // Close details without saving
    }

    return (
        <div className="details-container">
            <div className="orders-container">
                {myOrders &&
                    (myOrders.map((order, index) => (
                        <Order key={index} order={order} />
                    )))
                }
            </div>
            <div className="turns-container">
                {myTurns &&
                    (myTurns.map((turn, index) => (
                        <Turn key={index} turn={turn} />
                    )))
                }
            </div>
            <button className="update-button" onClick={() => setShowDetails(true)}>לעדכון פרטים</button>
            {showDetails && (
                <div className="details-modal">
                    <input
                        className="details-input"
                        placeholder='מייל'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="details-input"
                        placeholder='סיסמה'
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        className="details-input"
                        placeholder='שם'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className="details-input"
                        placeholder='טלפון'
                        type="text"
                        name="phone1"
                        value={formData.phone1}
                        onChange={handleChange}
                    />
                    <button className="save-button" onClick={handleSaveFunction}>שמור</button>
                    <button className="cancel-button" onClick={handleCancel}>ביטול</button>
                </div>
            )}

           {(userData.role==='admin'|| userData.role==='employee') &&(<WorkHoursOfEmployee />)}
        </div>
    );
}

export default MyDetails;
