// import React, { useState, useEffect } from 'react';
// import '../css/public.css';
// import { getDataById } from '../../Fetch';

// const Order = ({ order }) => {
//     const [show, setShow] = useState(false);
//     const [orderDetails, setOrderDetails] = useState(null);

//     const handleShowDetails = (orderId) => {
//         if (!show) {
//             getDataById("orders", orderId)
//                 .then(data => {
//                     console.log('Received order details:', data);
//                     setOrderDetails(data[0]);
//                     console.log('Received order details:', data);
//                     setShow(true);
//                 })
//         }
//         setShow(!show);
//     };
//     return (
//         <div>
//             <p>מספר הזמנה: {order.id}</p>
//             <p>שם: {order.name}</p>
//             <p>ת"ז לקוחה: {order.userId}</p>
//             <p>שם שמלה: {order.model}</p>
//             <p>תאריך חתונה: {order.weddingDate}</p>
//             <p>תאריך החזרת שמלה: {order.returnDate}</p>
//             <button type="button" onClick={() => handleShowDetails(order.id)}>
//                 ראה פרטים נוספים
//             </button>
//             {show && orderDetails &&
//                 <div>
//                     <p>מספר הזמנה: {orderDetails.id}</p>
//                     <p>שם: {orderDetails.name}</p>
//                     <p>פלאפון 1: {orderDetails.phone1}</p>
//                     <p>פלאפון 2: {orderDetails.phone2}</p>
//                     <p>מייל: {orderDetails.email}</p>
//                     <p>תאריך חתונה: {orderDetails.weddingDate}</p>
//                     <p>תאריך החזרת שמלה: {orderDetails.returnDate}</p>
//                     <p>שם שמלה: {orderDetails.model}</p>
//                     <p>תיקונים ראשונים: {orderDetails.repairs}</p>
//                     <p>אביזרים:{orderDetails.accessories}</p>
//                     <p>שולם מקדמה:</p>
//                     <label>
//                         <input type="radio" value="true" checked={orderDetails.paidInAdvance} />
//                         כן
//                     </label>
//                     <label>
//                         <input type="radio" value="false" checked={!orderDetails.paidInAdvance} />
//                         לא
//                     </label>
//                 </div>
//             }
//         </div>
//     );
// };

// export default Order;

import React, { useState } from 'react';
import '../css/public.css';
import '../css/order.css';

import { deleteObject, getDataById } from '../../Fetch';

const Order = ({ order, onDelete }) => {
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleShowDetails = (orderId) => {
    if (!show) {
      getDataById("orders", orderId)
        .then(data => {
          setOrderDetails(data[0]);
          setShow(true);
        })
        .catch(err => console.error('Error fetching order details:', err));
    }
    setShow(!show);
  };

  const handleDeleteOrder = (orderId) => {
    deleteObject("orders", orderId)
      .then(data => {
        console.log('Order deleted:', data);
        onDelete(orderId);
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <div className="order-card">
    <p>מספר הזמנה: {order.id}</p>
    <p>שם: {order.name}</p>
    <p>ת"ז לקוחה: {order.userId}</p>
    <p>שם שמלה: {order.model}</p>
    <p>תאריך חתונה: {order.weddingDate}</p>
    <p>תאריך החזרת שמלה: {order.returnDate}</p>
    <button type="button" onClick={() => handleShowDetails(order.id)}>
      ראה פרטים נוספים
    </button>
    <button type="button" onClick={() => handleDeleteOrder(order.id)}>
      מחיקה
    </button>
    {show && orderDetails &&
      <div className="order-details">
        <p>מספר הזמנה: {orderDetails.id}</p>
        <p>שם: {orderDetails.name}</p>
        <p>פלאפון 1: {orderDetails.phone1}</p>
        <p>פלאפון 2: {orderDetails.phone2}</p>
        <p>מייל: {orderDetails.email}</p>
        <p>תאריך חתונה: {orderDetails.weddingDate}</p>
        <p>תאריך החזרת שמלה: {orderDetails.returnDate}</p>
        <p>שם שמלה: {orderDetails.model}</p>
        <p>תיקונים ראשונים: {orderDetails.repairs}</p>
        <p>אביזרים: {orderDetails.accessories}</p>
        <p>שולם מקדמה:</p>
        <label>
          <input type="radio" value="true" checked={orderDetails.paidInAdvance} readOnly />
          כן
        </label>
        <label>
          <input type="radio" value="false" checked={!orderDetails.paidInAdvance} readOnly />
          לא
        </label>
      </div>
    }
  </div>
  );
};

export default Order;

