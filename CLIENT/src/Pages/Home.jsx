import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Reminder from '../Components/Reminder';
import imageHomePage from '../../images/2024-07-04 183940.png';
import { UserContext } from '../App';
import '../css/Home.css';

const Home = ({ setUserData }) => {
    const p = `לפני כ-20 שנה הקימה וייסדה הגברת ציפי ישי את סטודיו 'תפארת - חן' סטודיו יוקרתי ומפנק ליום הכי מיוחד בחייה של כל כלה! 
    בסטודיו תפארת חן מבחר גדול ומגוון של שמלות כלה עשויות תחרה יוקרתית מהקולקציות המעודכנות ביותר ובהשראת מעצבים מובילים מרחבי העולם, תוך התאמה לקהל הדתי מבלי להתפשר על רמת העיצוב.
     עיצוב אישי וייחודי בגזרות מותאמות המחמיאות לך, ושימוש בבדים, תחרות וחומרי גלם משובחים.
    תפארת חן הינו סטודיו יוקרתי לשמלות כלה שאינו מתפשר על יחס אישי לכל כלה רמת עיצוב גבוהה . בסטודיו שלנו הממוקם בשכונת הר נוף בירושלים, מבחר עשיר, גדול, עדכני וצנוע של שמלות כלה המעוצבות ברמה יוקרתית ובמחירים סבירים.
    
    אנו מזמינים אותך לבוא ביום המאושר בחייך לסלון הכלות היוקרתי שלנו לאירוע מושלם ביום הגדול בחייה של כל כלה.
    
    הכתובת שלנו רחוב קצנלבוגן 30 שכונת הר נוף ירושלים. 
    מספר הטלפון : 026513648 , 0507454200
    
     מחכות לך באהבה, צוות תפארת חן`
    const [about, setAbout] = useState(p);
    const [isEditing, setIsEditing] = useState(false);
    const [newAbout, setNewAbout] = useState(about);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userData = useContext(UserContext);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setAbout(newAbout);
        setIsEditing(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div id='HomePage'>
                <img src={imageHomePage} alt="image" className="imageHomePage" />
            </div>
            <h3>{about}</h3>
            {userData.role === 'admin' && (
                isEditing ? (
                    <>
                        <input
                            type="text"
                            value={newAbout}
                            onChange={(e) => setNewAbout(e.target.value)}
                            placeholder="עדכן אודות"
                        />
                        <button onClick={handleSaveClick}>אישור</button>
                    </>
                ) : (
                    <button onClick={handleEditClick}>עדכן</button>
                )
            )}
            {(userData.role === "employee" || userData.role === "admin") && (
                <button onClick={toggleSidebar}>תזכורות</button>
            )}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>×</button>
                <Reminder />
            </div>
        </>
    );
}

export default Home;

// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import Reminder from '../Components/Reminder';
// import imageHomePage from '../../images/2024-07-04 183940.png';
// import { UserContext } from '../App';
// import '../css/public.css';
// const Home = ({ setUserData }) => {
//     const p = `לפני כ-20 שנה הקימה וייסדה הגברת ציפי ישי את סטודיו 'תפארת - חן' סטודיו יוקרתי ומפנק ליום הכי מיוחד בחייה של כל כלה! 
//     בסטודיו תפארת חן מבחר גדול ומגוון של שמלות כלה עשויות תחרה יוקרתית מהקולקציות המעודכנות ביותר ובהשראת מעצבים מובילים מרחבי העולם, תוך התאמה לקהל הדתי מבלי להתפשר על רמת העיצוב.
//      עיצוב אישי וייחודי בגזרות מותאמות המחמיאות לך, ושימוש בבדים, תחרות וחומרי גלם משובחים.
//     תפארת חן הינו סטודיו יוקרתי לשמלות כלה שאינו מתפשר על יחס אישי לכל כלה רמת עיצוב גבוהה . בסטודיו שלנו הממוקם בשכונת הר נוף בירושלים, מבחר עשיר, גדול, עדכני וצנוע של שמלות כלה המעוצבות ברמה יוקרתית ובמחירים סבירים.
    
//     אנו מזמינים אותך לבוא ביום המאושר בחייך לסלון הכלות היוקרתי שלנו לאירוע מושלם ביום הגדול בחייה של כל כלה.
    
//     הכתובת שלנו רחוב קצנלבוגן 30 שכונת הר נוף ירושלים. 
//     מספר הטלפון : 026513648 , 0507454200
    
//      מחכות לך באהבה, צוות תפארת חן`
//     const [about, setAbout] = useState(p);
//     const [isEditing, setIsEditing] = useState(false);
//     const [newAbout, setNewAbout] = useState(about);
//     const userData = useContext(UserContext);
//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = () => {
//         setAbout(newAbout);
//         setIsEditing(false);
//     };
//     return (
//         <>
//         <div id='HomePage'>
//        <img src={imageHomePage} alt="image" className="imageHomePage" />
//        </div>
//             <h3>{about}</h3>
//             {userData.role === 'admin' && (
//                 isEditing ? (
//                     <>
//                         <input
//                             type="text"
//                             value={newAbout}
//                             onChange={(e) => setNewAbout(e.target.value)}
//                             placeholder="עדכן אודות"
//                         />
//                         <button onClick={handleSaveClick}>אישור</button>
//                     </>
//                 ) : (
//                     <button onClick={handleEditClick}>עדכן</button>
//                 )
//             )}
//             {userData.role == "employee" || userData.role == "admin" && <Reminder />}
//         </>
//     );
// }

// export default Home;
