import React, { useState, useEffect } from 'react';
import Order from "../Components/Order";
import '../css/public.css';
import SearchOptions from '../Components/SearchOptions';
import EditingOrder from '../Components/EditingOrder';
import { getData, postNewObject, updateObject } from '../../Fetch';
import '../css/order.css';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getData("orders")
      .then(data => {
        setOrders([...data]);
        setOrdersFilter([...data]);
      });
  }, []);

  const handleCreateOrder = (order, client) => {
    setModalOpen(false);
    postNewObject("orders", order)
    .then(data => {
      updateObject("clients", order.clientId, client);
        setOrders([...data]);
        setOrdersFilter([...data]);
      });
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    setOrdersFilter(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  return (
    <>
    <h2 className="orders-title">כל ההזמנות</h2>
    <button type="button" onClick={() => setModalOpen(true)}>
      הזמנה חדשה
    </button>
    {isModalOpen && <EditingOrder handleSubmit={handleCreateOrder}/>}
    <SearchOptions setListFilter={setOrdersFilter} list={orders} />
    <div className="orders-container">
      {ordersFilter.map((order, index) => (
        <Order 
          key={index} 
          order={order} 
          onDelete={handleDeleteOrder} 
        />
      ))}
    </div>
  </>
  );
};

export default Orders;
