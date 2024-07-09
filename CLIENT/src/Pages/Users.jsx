import React, { useState, useEffect } from 'react';
import { getData, postNewObject, updateObject, deleteObject } from '../../Fetch';
import GenericChanges from '../Components/GenericChanges';
import SearchOptions from '../Components/SearchOptions';
import '../css/users.css'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [usersFilter,setUsersFilter] = useState([]);
    const userData = {
        userId: "",
        name: "",
        email: "",
        phone1: "",
        phone2: "",
        roleId: "",
        password: ""
    };

    useEffect(() => {
        getData("users")
        .then(data => {
            console.log(data)
            setUsers([...data]);
            setUsersFilter([...data]);
        })
    }, []);

    const handleSave = (user) => {
        postNewObject("users", user)
            .then(data => {
                setUsers([...data]);
                setUsersFilter([...data]);
            })
    }
    const deleteUser = (userId, role) => {
        if(role=="client")
        {
            deleteObject("clients", userId)
            .then(data => {
                setUsers([...data]);
                setUsersFilter([...data]);
            })
        }
        else{
            deleteObject("users", userId)
                .then(data => {
                    setUsers([...data]);
                    setUsersFilter([...data]);
                })
        }
    }

    return (
        <>
        <SearchOptions setListFilter={setUsersFilter} list={users} />
        <GenericChanges
            formData={userData}
            attributesArrHe={["ת.ז", "שם פרטי ומשפחה", "מייל", "פלאפון 1", "פלאפון 2", "סיסמה"]}
            attributesArrEn={["userId", "name", "email", "phone1", "phone2", "password"]}
            handleSave={handleSave}
            func="add"
        />
        <div className="users-table">
            <table>
                <thead>
                    <tr>
                        <th>ת"ז</th>
                        <th>שם פרטי ושם משפחה</th>
                        <th>כתובת מייל</th>
                        <th>מספר טלפון</th>
                        <th>מספר טלפון נוסף</th>
                        <th>תפקיד</th>
                        <th>פעולות</th> {/* הוספת עמודה לכפתור מחיקה */}
                    </tr>
                </thead>
                <tbody>
                    {usersFilter.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone1}</td>
                            <td>{user.phone2}</td>
                            <td>{user.role === "client" ? "לקוחה" : "עובדת"}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteUser(user.id, user.role)}>מחק</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    );
};

export default Users;