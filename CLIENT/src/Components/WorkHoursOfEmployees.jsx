import React, { useState, useEffect, useContext } from 'react';
import { getData } from '../../Fetch';

const WorkHoursOfEmployees = () => {
    const [workHours, setWorkHours] = useState([]);
    const [showDetails, setShowDetails]=useState(false)
    useEffect(() => {
        getData("workHours")
            .then(data => {
                setWorkHours([...data])
            })
    }, []);
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
                        <th>ת"ז</th>
                        <th>שם</th>
                        <th>פלאפון</th>
                        <th>מספר שעות עבודה</th>
                    </tr>
                </thead>
                <tbody>
                    {workHours.map((workHour, index) =>
                        <tr key={index}>
                            <td>{workHour.userId}</td>
                            <td>{workHour.name}</td>
                            <td>{workHour.phone1}</td>
                            <td>{formatDuration(workHour.totalDuration)}</td>
                            <td><button onClick={()=>setShowDetails(true)}>ראה פירוט</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </div>
    );
};

export default WorkHoursOfEmployees;