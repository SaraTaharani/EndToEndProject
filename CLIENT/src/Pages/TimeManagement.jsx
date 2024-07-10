import React, { useState, useEffect } from 'react';
import { getData, updateObject, deleteObject } from '../../Fetch';
import SearchOptions from '../Components/SearchOptions';
// import '../css/public.css'; 
import '../css/ActivityTime.css'; 

const ActivityTime = () => {
    const [activityTimes, setActivityTimes] = useState([]);
    const [activityTimesFilter, setActivityTimesFilter] = useState([]);
    const [currentEditId, setCurrentEditId] = useState(null);

    useEffect(() => {
        getData("activityTime")
            .then(data => {
                setActivityTimes([...data]);
                setActivityTimesFilter([...data]);
            });
    }, []);

    const handleSave = (id, updatedActivityTime) => {
        updateObject("activityTime", id, updatedActivityTime)
            .then(data => {
                setActivityTimes([...data]);
                setActivityTimesFilter([...data]);
                setCurrentEditId(null);
            });
    }

    const handleEdit = (id) => {
        setCurrentEditId(id);
    }

    const deleteActivityTime = (id) => {
        deleteObject("activityTime", id)
            .then(data => {
                setActivityTimes([...data]);
                setActivityTimesFilter([...data]);
            });
    }

    return (
        <>
            <SearchOptions setListFilter={setActivityTimesFilter} list={activityTimes} />
            <div className="activity-time-table">
                <table>
                    <thead>
                        <tr>
                            <th>יום</th>
                            <th>שעת התחלה</th>
                            <th>דקות התחלה</th>
                            <th>שעת סיום</th>
                            <th>דקות סיום</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityTimesFilter.map((activityTime, index) => (
                            <tr key={index}>
                                {currentEditId === activityTime.id ? (
                                    <>
                                        <td><input type="text" defaultValue={activityTime.day} id={`day-${activityTime.id}`} /></td>
                                        <td><input type="number" defaultValue={activityTime.startTimeHour} id={`startHour-${activityTime.id}`} /></td>
                                        <td><input type="number" defaultValue={activityTime.startTimeMinutes} id={`startMinutes-${activityTime.id}`} /></td>
                                        <td><input type="number" defaultValue={activityTime.endTimeHour} id={`endHour-${activityTime.id}`} /></td>
                                        <td><input type="number" defaultValue={activityTime.endTimeMinutes} id={`endMinutes-${activityTime.id}`} /></td>
                                        <td>
                                            <button className="save-button" onClick={() => {
                                                const updatedActivityTime = {
                                                    day: document.getElementById(`day-${activityTime.id}`).value,
                                                    startTimeHour: parseInt(document.getElementById(`startHour-${activityTime.id}`).value),
                                                    startTimeMinutes: parseInt(document.getElementById(`startMinutes-${activityTime.id}`).value),
                                                    endTimeHour: parseInt(document.getElementById(`endHour-${activityTime.id}`).value),
                                                    endTimeMinutes: parseInt(document.getElementById(`endMinutes-${activityTime.id}`).value),
                                                };
                                                handleSave(activityTime.id, updatedActivityTime);
                                            }}>שמור</button>
                                            <button className="cancle-button" onClick={() => setCurrentEditId(null)}>בטל</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{activityTime.day}</td>
                                        <td>{activityTime.startTimeHour}</td>
                                        <td>{activityTime.startTimeMinutes}</td>
                                        <td>{activityTime.endTimeHour}</td>
                                        <td>{activityTime.endTimeMinutes}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => handleEdit(activityTime.id)}>ערוך</button>
                                            <button className="delete-button" onClick={() => deleteActivityTime(activityTime.id)}>מחק</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ActivityTime;