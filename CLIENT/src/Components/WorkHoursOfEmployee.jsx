import React, { useState, useEffect, useContext } from 'react';
import { getDataById, postNewObject, updateObject } from '../../Fetch';
import { UserContext } from '../App';

const WorkHoursOfUser = () => {
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
    const getCurrentTime=() =>{
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    
    const handleStart = () => {
        const newWorkHour = {
            employeeId: userData.id,
            date: new Date().toISOString().split('T')[0],
            startTime: getCurrentTime(),
        };
        postNewObject("workHours", newWorkHour)
            .then(data => {
                console.log([...data])
                setWorkHours([...data]);
                setIsWorking(true);
            });
    };

    const handleEnd = (workHour) => {
        console.log(workHour)
        const updatedWorkHour = {
            ...workHour,
            date:new Date(workHour.date).toISOString().split('T')[0],
            endTime: getCurrentTime(),
            duration: calculateHoursDifference(workHour.startTime, getCurrentTime()),
        };
        console.log(updatedWorkHour)
        updateObject("workHours", workHour.id, updatedWorkHour)
            .then(data => {
                console.log(data)
                setWorkHours([...data]);
                setIsWorking(false);
            })
    };

    const calculateHoursDifference = (start, end) => {
        const startTime = new Date(`1970-01-01T${start}`);
        const endTime = new Date(`1970-01-01T${end}`);
        const diffMilliseconds = endTime - startTime;
        const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
        return diffMinutes; 
    };

    const formatDuration = (durationMinutes) => {
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        return `${hours} שעות ו-${minutes} דקות`;
    };
    return (
        <div>
            <button onClick={isWorking ? () => handleEnd(workHours[workHours.length - 1]) : handleStart}>
                {isWorking ? 'סיום עבודה' : 'התחלת עבודה'}
            </button>
            <table>
                <thead>
                    <tr>
                    <th>תאריך</th>
                        <th>שעת התחלה</th>
                        <th>שעת סיום</th>
                        <th>שעות עבודה</th>
                    </tr>
                </thead>
                <tbody>
                    {workHours.map((workHour, index) =>
                        <tr key={index}>
                            <td>{new Date(workHour.date).toISOString().split('T')[0]}</td>
                            <td>{workHour.startTime || '-'}</td>
                            <td>
                                {workHour.endTime || (
                                    <button onClick={() => handleEnd(workHour)}>סיום עבודה</button>
                                )}
                            </td>
                            <td>{workHour.duration!=null? formatDuration(workHour.duration): "-"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WorkHoursOfUser;