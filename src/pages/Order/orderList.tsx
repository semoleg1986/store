import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { ORDER_BY_BUYER_ID } from '../../graphql/mutation/order';
import { RootState } from '../../store';
import './orderList.css';

interface Order {
  id: string;
  receiptNumber: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  status: string;
  updateDate: string;
}

function OrderList() {
  const buyerId = useSelector((state: RootState) => state.auth.idBuyer);
  const { loading, error, data } = useQuery(ORDER_BY_BUYER_ID, {
    variables: { buyerId },
  });

  const [showArchive, setShowArchive] = useState(false);

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

  const archiveOrders = orders.filter((order: Order) => order.status === 'Завершен');
  // const activeOrders = orders.filter((order: Order) => order.status !== 'Завершен');
  if (!orders && !showArchive) {
    return <p>No active orders available.</p>;
  }

  const activeOrders = orders.filter((order: Order) => order.status !== 'Завершен');

  const toggleArchive = () => {
    setShowArchive(!showArchive);
  };

  return (
    <div>
      <h3>Order List</h3>
      {activeOrders.length > 0 && !showArchive && (
        <div>
          <h4>Active Orders</h4>
          {activeOrders.map((order: Order) => (
            <div key={order.id} className="order-item">
              <p className="order-info">Receipt Number: {order.receiptNumber}</p>
              <p className="order-info">Name: {order.name}</p>
              <p className="order-info">Surname: {order.surname}</p>
              <p className="order-info">Phone Number: {order.phoneNumber}</p>
              <p className="order-info">Address: {order.address}</p>
              <p className="order-info">Status: {order.status}</p>
              <p className="order-info">Update Date: {order.updateDate}</p>
            </div>
          ))}
        </div>
      )}
      {activeOrders.length === 0 && !showArchive && <p>No active orders available.</p>}
      {!showArchive && (
        <button type="button" onClick={toggleArchive}>
          View Archive Orders
        </button>
      )}
      {showArchive && (
        <div>
          <h4>Archive Orders</h4>
          {archiveOrders.map((order: Order) => (
            <div key={order.id} className="order-item">
              <p className="order-info">Receipt Number: {order.receiptNumber}</p>
              <p className="order-info">Name: {order.name}</p>
              <p className="order-info">Surname: {order.surname}</p>
              <p className="order-info">Phone Number: {order.phoneNumber}</p>
              <p className="order-info">Address: {order.address}</p>
              <p className="order-info">Status: {order.status}</p>
              <p className="order-info">Update Date: {order.updateDate}</p>
            </div>
          ))}
          <button type="button" onClick={toggleArchive}>
            Back to Active Orders
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderList;
