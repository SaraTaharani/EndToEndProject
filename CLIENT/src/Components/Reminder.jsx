// import React, { useState, useEffect } from 'react';
// import Order from "../Components/Order";
// import '../css/public.css';
// import { getData, postNewObject } from '../../Fetch';
// const Reminder= () => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         getData("orders")
//           .then(data => {
//             setOrders([...data])
//           });
//       }, []);
//       console.log(orders)

//       return(
// <>
// <p>לוקחות שמלה</p>
// {orders.map((order, index) => {
//   console.log(order.weddingDate)
//     const date = new Date(order.weddingDate);
//    const returnDate = new Date(order.weddingDate); // Assuming order.weddingDate is a valid date string
//    returnDate.setDate(returnDate.getDate() + 1);
//    const returnDateISO = returnDate.toISOString().split('T')[0];
//    console.log(returnDateISO)
//    console.log(date)
//    returnDateISO==date&& <Order key={index} order={order} />;
// })}


// <p>מחזירות שמלה היום</p>
// {orders.map((order, index) => (
//     order.returnDate==new Date().toISOString().split('T')[0] && <Order key={index} order={order} />
// ))}


// </>
//       )
// }
// export default Reminder
import React, { useState, useEffect } from 'react';
import Order from "../Components/Order";
import '../css/public.css';
import { getData, postNewObject } from '../../Fetch';

const Reminder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getData("orders")
          .then(data => {
            setOrders([...data]);
          });
    }, []);

    const today = new Date().toISOString().split('T')[0];

    const pickupOrders = orders.filter(order => {
        const weddingDate = new Date(order.weddingDate);
        weddingDate.setDate(weddingDate.getDate() - 1);
        const pickupDate = weddingDate.toISOString().split('T')[0];
        return pickupDate === today;
    });
    
    const returnOrders = orders.filter(order => {
        const returnDate = new Date(order.returnDate).toISOString().split('T')[0];
        return returnDate === today;
    });
    

    return (
        <>
            <p>לקוחות שמלה</p>
            {pickupOrders.map((order, index) => (
                <Order key={index} order={order} />
            ))}

            <p>מחזירות שמלה היום</p>
            {returnOrders.map((order, index) => (
                <Order key={index} order={order} />
            ))}
        </>
    );
};

export default Reminder;

