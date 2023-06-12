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

  return (
    <div>
      <h3>Order List</h3>
      <div>
        <h4>Active Orders</h4>
        {orders.map((order: Order) => (
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
      </div>
    </div>
  );
}

export default OrderList;
