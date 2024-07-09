import React, { useState, useEffect } from 'react';
import '../css/public.css';
import { getData } from '../../Fetch';
import { AutoComplete } from 'primereact/autocomplete';
import { MultiSelect } from 'primereact/multiselect';
import '../css/order.css';

const EditingOrder = ({ handleSubmit, order }) => {
    const [dress, setDress] = useState(order?.model || "");
    const [dresses, setDresses] = useState([]);
    const [filteredDresses, setFilteredDresses] = useState(dresses);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState(clients);
    const [email, setEmail] = useState(order?.email || "");
    const [accessories, setAccessories] = useState([]);
    const [selectedAccessories, setSelectedAccessories] = useState(null);

    const [orderData, setOrderData] = useState({
        date: new Date().toISOString().split('T')[0],
        returnDate: '',
        clientId: 0,
        dressId: '',
        repairs: '',
        paidInAdvance: false,
        accessoriesId: []
    });

    const [formData, setFormData] = useState({
        name: order?.name || "",
        phone1: order?.phone1 || "",
        userId: order?.userId || "",
        phone2: order?.phone2 || "",
        weddingDate: order?.weddingDate || "",
        returnDate: order?.returnDate || "",
        model: order?.model || "",
        repairs: order?.repairs || "",
        paidInAdvance: order?.paidInAdvance || false
    });
     
    
    const [client, setClient] = useState({
        email: '',
        name: '',
        phone1: '',
        phone2: '',
        userId: '',
        weddingDate: ''
    })


    useEffect(() => {
        console.log(order)
        getData("clients")
            .then(data => {
                setClients([...data])
            });
        getData("dresses")
            .then(data => {
                setDresses([...data])
            });
        getData("accessories")
            .then(data => {
                setAccessories([...data])
            });
    }, []);
    const changeInputHandler = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            repairs: value,
        }));
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            repairs: value
        }));
    };
    const searchEmail = (event) => {
        setFilteredClients(clients.filter(client => client.email.toLowerCase().includes(event.query.toLowerCase())))
    }
    const searchDress = (event) => {
        setFilteredDresses(dresses.filter(dress => dress.model.toLowerCase().includes(event.query.toLowerCase())))
    }
    const handleClientSelect = (client) => {
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            clientId: client.id,
        }));
        setFormData((prevFormData) => ({
            ...prevFormData,
            name: client.name,
            phone1: client.phone1,
        }))
        setClient((prevClient) => ({
            ...prevClient,
            email: client.email,
            name: client.name,
            phone1: client.phone1
        }))
    };
    const handleDressSelect = (dress) => {
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            dressId: dress.id
        }));
    };
    const handleAccessoriesSelect = (accessories) => {
        const accessoriesId = accessories.map((accessory) => (accessory.id))
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            accessoriesId: accessoriesId
        }));
    };
    const handlePaidInAdvanceChange = (event) => {
        const value = event.target.value === 'true';
        setOrderData((prevOrderData) => ({
            ...prevOrderData,
            paidInAdvance: value
        }));
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;


        if (name === "weddingDate") {
            const weddingDate = new Date(value).toISOString().split('T')[0];
            const returnDate = new Date(weddingDate);
            returnDate.setDate(returnDate.getDate() + 1);
            const returnDateISO = returnDate.toISOString().split('T')[0];
            setOrderData((prevOrderData) => ({
                ...prevOrderData,
                returnDate: returnDateISO
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                returnDate: returnDateISO,
                weddingDate: value,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>הזמנה חדשה</h2>
                <label>מייל של לקוחה:</label>
                <AutoComplete
                    value={email}
                    suggestions={filteredClients}
                    completeMethod={searchEmail}
                    onChange={(e) => setEmail(e.value)}
                    onSelect={(e) => handleClientSelect(e.value)}
                    field="email"
                    placeholder="הכניסי מייל של לקוחה"
                />
                <label htmlFor="name">שם פרטי ושם משפחה:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='שם פרטי ושם משפחה'
                    value={formData.name}
                    readOnly
                />
                <label htmlFor="phone1">מספר טלפון:</label>
                <input
                    type="text"
                    id="phone1"
                    name="phone1"
                    placeholder='מספר טלפון'
                    value={formData.phone1}
                    readOnly
                />
                <label htmlFor="userId">מספר תעודת זהות</label>
                <input
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder='מספר תעודת זהות'
                    value={formData.userId}
                    onChange={changeHandler}
                />
                <label htmlFor="phone2">מספר טלפון נוסף:</label>
                <input
                    type="text"
                    id="phone2"
                    name="phone2"
                    placeholder='מספר טלפון נוסף'
                    value={formData.phone2}
                    onChange={changeHandler}
                />
                <label htmlFor="weddingDate">תאריך חתונה:</label>
                <input
                    type="date"
                    id="weddingDate"
                    name="weddingDate"
                    placeholder='תאריך חתונה'
                    value={formData.weddingDate}
                    onChange={changeHandler}
                />
                <label htmlFor="returnDate">תאריך החזרה:</label>
                <input
                    type="text"
                    id="returnDate"
                    name="returnDate"
                    placeholder='תאריך החזרה'
                    value={formData.returnDate}
                    readOnly
                />
                <label>מודל שמלה:</label>
                <AutoComplete
                    value={dress}
                    suggestions={filteredDresses}
                    completeMethod={searchDress}
                    onChange={(e) => setDress(e.value)}
                    onSelect={(e) => handleDressSelect(e.value)}
                    field="model"
                    placeholder="הכניסי מודל של שמלה"
                />
                <label htmlFor="repairs">תיקונים:</label>
                <input
                    type="text"
                    id="repairs"
                    name="repairs"
                    placeholder='תיקונים'
                    value={formData.repairs}
                    onChange={changeInputHandler}
                />
                <label>אביזרים:</label>
                <MultiSelect
                    value={selectedAccessories}
                    onChange={(e) => {
                        setSelectedAccessories(e.value);
                        handleAccessoriesSelect(e.value)
                    }}
                    options={accessories}
                    optionLabel="type"
                    placeholder="בחרי אביזרים"
                />
                <div className="radio-group">
                    <p>שולם מקדמה:</p>
                      <label>
                        <input
                            type="radio"
                            name="paidInAdvance"
                            value="true"
                            checked={order?order.paidInAdvance:false}
                            onChange={handlePaidInAdvanceChange}
                        />
                        כן
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paidInAdvance"
                            value="false"
                           checked={order?order.paidInAdvance:true}
                            onChange={handlePaidInAdvanceChange}
                        />
                        לא
                    </label>
                </div>
                <button type="button" onClick={() => handleSubmit(orderData, client)}>
                    צור הזמנה
                </button>
            </div>
        </div>
    );
};

export default EditingOrder;
