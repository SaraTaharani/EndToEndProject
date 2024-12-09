import React, { useState, useEffect } from 'react';
import { getDataById } from '../../Fetch';

const WorkHoursTable = ({ employeeId }) => {
    const [workHours, setWorkHours] = useState([]);
console.log("workHours")
console.log(employeeId)

useEffect(() => {
    getDataById("workHours", employeeId)
        .then(data => {
            console.log("Data received for employee:", data);
            setWorkHours([...data]);
        })
        .catch(error => {
            console.error("Error fetching work hours:", error);
        });
}, [employeeId]);

    console.log(workHours)

    const formatDuration = (durationMinutes) => {
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        return `${hours} שעות ו-${minutes} דקות`;
    };

    return (
        <div>
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
                    {workHours.map((workHour, index) => (
                        <tr key={index}>
                            <td>{workHour.date}</td>
                            <td>{workHour.startTime || '-'}</td>
                            <td>{workHour.endTime || '-'}</td>
                            <td>{workHour.duration != null ? formatDuration(workHour.duration) : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkHoursTable;
