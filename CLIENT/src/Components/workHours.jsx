import React, { useState, useEffect, useContext } from 'react';
import { getDataById, postNewObject, updateObject } from '../../Fetch';
import { UserContext } from '../App';

const WorkHours = () => {
    const userData = useContext(UserContext);
    const [workHours, setWorkHours] = useState([]);
    const [isWorking, setIsWorking] = useState(false);

    useEffect(() => {
        getDataById("workHours", userData.id)
            .then(data => {
                console.log(data);
                setWorkHours([...data])
            })
    }, []);

    const handleStart = async () => {
        const newWorkHour = {
            employeeId: userData.id,
            date: new Date().toISOString().slice(0, 10),
            startTime: new Date().toISOString().slice(11, 19),
        };
        postNewObject("workHours", newWorkHour)
            .then(data => {
                setWorkHours([...data]); // הוספת השעה החדשה לרשימה של השעות
                setIsWorking(true);
            });
    };

    const handleEnd = async (workHour) => {
        const endTime = new Date().toISOString().slice(11, 19);
        const updatedWorkHour = {
            ...workHour,
            endTime: endTime,
            duration: calculateHoursDifference(workHour.startTime, endTime),
        };
        console.log(updatedWorkHour)
        updateObject("workHours", workHour.id, updatedWorkHour)
            .then(data => {
                setWorkHours([...data]);
                setIsWorking(false);
            })
    };

    const calculateHoursDifference = (start, end) => {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const diffMilliseconds = endTime - startTime;
        const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return diffHours + diffMinutes / 60;
    };

    return (
        <div>
            <button onClick={isWorking ? () => handleEnd(workHours[workHours.length - 1]) : handleStart}>
                {isWorking ? 'סיום עבודה' : 'התחלת עבודה'}
            </button>
            <table>
                <thead>
                    <tr>
                        <th>שעת התחלה</th>
                        <th>שעת סיום</th>
                        <th>שעות עבודה</th>
                    </tr>
                </thead>
                <tbody>
                    {workHours.map((workHour, index) =>
                        <tr key={index}>
                            <td>{workHour.startTime || '-'}</td>
                            <td>
                                {workHour.endTime || (
                                    <button onClick={() => handleEnd(workHour)}>סיום עבודה</button>
                                )}
                            </td>
                            <td>{workHour.duration}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WorkHours;