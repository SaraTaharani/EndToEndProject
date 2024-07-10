
import React, { useContext } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import logo from '../../images/logo.png';
import profileImage from '../../images/240_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.png';
import '../css/public.css';
// import '../css/Header.css';

function Header({ setUserData }) {
  const navigate = useNavigate();
  const userData = useContext(UserContext);
  console.log(userData)
  console.log('userData')
  const handleLogout = () => {
    setUserData({});
    navigate('/');
  };

  return (
    <div className="headerDiv">
      <header>
        <div className="header-logo-container">
          <img src={logo} alt="Logo" className="header-logo" onClick={() => navigate('/')} />
        </div>
        <div className="profile">
          <img src={profileImage} alt="Profile" className="profile-image" />
          {userData && <span> {userData.name}</span>}
        </div>
        <nav className="header-nav">
          <NavLink
            to='/logIn'
            className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
          >
            התחברות
          </NavLink>

          {(userData.role === "employee" || userData.role === "admin" ||userData.role ==='client') && (
            <NavLink
              to='/'
              className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
              onClick={handleLogout}
            >
              התנתקות
            </NavLink>
          )}

          {(userData.role == "employee" || userData.role == "admin" )&&( <NavLink
            to='/calendar'
            className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
          >
            תורים
          </NavLink>)}
          <NavLink
            to='/gallery'
            className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
          >
            גלריה
          </NavLink>

          {(userData.role == "employee" || userData.role == "admin" )&&( <NavLink
              to='/orders'
              className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
            >
              הזמנות
            </NavLink>
          )}
          {userData.role == "admin" &&
            <NavLink
              to='/dresses'
              className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
            >
              שמלות
            </NavLink>
          }
          {userData.role == "admin" &&
            <NavLink
              to='/accessories'
              className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
            >
              אביזרים
            </NavLink>
          }

          {userData.role == "admin" &&
            <NavLink
              to='/users'
              className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
            >
              ניהול משתמשים
            </NavLink>
          }
          {userData.role == "admin" &&
            <NavLink
              to='/TimeManagement'
              className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
            >
              ניהול שעות
            </NavLink>
          }
         {(userData.role === "employee" || userData.role === "admin" ||userData.role ==='client') && ( <NavLink
            to='/myDetails'
            className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
          >
            איזור אישי
          </NavLink>
         )}
          <NavLink
            to='/ContactUs'
            className={({ isActive }) => isActive ? "header-nav-link header-nav-link-active" : "header-nav-link"}
          >
            צור קשר
          </NavLink>
        </nav>
      </header>
    </div>
  );
}
export default Header