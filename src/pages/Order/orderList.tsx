import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { ORDER_BY_BUYER_ID } from '../../graphql/mutation/order';
import { RootState } from '../../store';
import './orderList.css';
import { IOrder, IOrderItem } from '../../types';

function OrderList() {
  const buyerId = useSelector((state: RootState) => state.auth.idBuyer);
  const { loading, error, data } = useQuery(ORDER_BY_BUYER_ID, {
    variables: { buyerId },
  });

  const [showArchive, setShowArchive] = useState(false);
  const [orderDetailsVisible, setOrderDetailsVisible] = useState('');

  const toggleArchive = () => {
    setShowArchive(!showArchive);
  };

  const toggleOrderDetails = (orderId: string) => {
    if (orderDetailsVisible === orderId) {
      setOrderDetailsVisible('');
    } else {
      setOrderDetailsVisible(orderId);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const orders = data.ordersByBuyerId;

  if (!orders) {
    return <p>No orders available.</p>;
  }

  const archiveOrders = orders.filter((order: IOrder) => order.status === 'Выполнен');
  const activeOrders = orders.filter((order: IOrder) => order.status !== 'Выполнен');

  const renderOrderDetails = (order: IOrder) => {
    const calculateTotalAmount = (orderItems: IOrderItem[]) => {
      let total = 0;
      orderItems.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return total;
    };

    return (
      <div className="order-details">
        <h6>Items:</h6>
        <ol>
          {order.orderitemSet.map((item) => (
            <li key={item.product.name}>
              {item.product.name} - Quantity: {item.quantity} - Price: {item.product.price}
            </li>
          ))}
        </ol>
        <p>Total Amount: {calculateTotalAmount(order.orderitemSet)}</p>
      </div>
    );
  };

  const renderActiveOrders = () => {
    return (
      <div>
        <h4>Active Orders</h4>
        {activeOrders.map((order: IOrder) => (
          <div key={order.id} className="order-item">
            <p className="order-info">Receipt Number: {order.receiptNumber}</p>
            <p className="order-info">Name: {order.name}</p>
            <p className="order-info">Surname: {order.surname}</p>
            <p className="order-info">Phone Number: {order.phoneNumber}</p>
            <p className="order-info">Address: {order.address}</p>
            <p className="order-info">Status: {order.status}</p>
            <p className="order-info">Update Date: {order.updateDate}</p>
            <button type="button" onClick={() => toggleOrderDetails(order.id)}>
              Show Details
            </button>
            {orderDetailsVisible === order.id && renderOrderDetails(order)}
          </div>
        ))}
      </div>
    );
  };

  const renderArchiveOrders = () => {
    return (
      <div>
        <h4>Archive Orders</h4>
        {archiveOrders.map((order: IOrder) => (
          <div key={order.id} className="order-item">
            <p className="order-info">Receipt Number: {order.receiptNumber}</p>
            <p className="order-info">Name: {order.name}</p>
            <p className="order-info">Surname: {order.surname}</p>
            <p className="order-info">Phone Number: {order.phoneNumber}</p>
            <p className="order-info">Address: {order.address}</p>
            <p className="order-info">Status: {order.status}</p>
            <p className="order-info">Update Date: {order.updateDate}</p>
            <button type="button" onClick={() => toggleOrderDetails(order.id)}>
              Show Details
            </button>
            {orderDetailsVisible === order.id && renderOrderDetails(order)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h3>Order List</h3>
      {activeOrders.length > 0 && !showArchive && renderActiveOrders()}
      {activeOrders.length === 0 && !showArchive && <p>No active orders available.</p>}
      {showArchive && renderArchiveOrders()}
      <button type="button" onClick={toggleArchive}>
        {showArchive ? 'View Active Orders' : 'View Archive Orders'}
      </button>
    </div>
  );
}

export default OrderList;
