import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { ORDER_BY_BUYER_ID } from '../../graphql/mutation/order';
import { RootState } from '../../store';
import './orderList.css';
import { IOrder, IOrderItem } from '../../types';
import { Button } from '../../components/styles/Form.styled';

function OrderList() {
  const buyerId = useSelector((state: RootState) => state.auth.idBuyer);
  const { loading, error, data } = useQuery(ORDER_BY_BUYER_ID, {
    variables: { buyerId },
  });

  const [showArchive, setShowArchive] = useState(false);

  const toggleArchive = () => {
    setShowArchive(!showArchive);
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
        <ul>
          {order.orderitemSet.map((item) => (
            <li key={item.product.name}>
              {item.product.name} - Quantity: {item.quantity} - Price: {item.product.price}
            </li>
          ))}
        </ul>
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
            <p className="order-info">
              Order Number<span>{order.receiptNumber}</span>
            </p>
            <p className="order-info">
              Update Date<span>{order.updateDate.substring(0, 10)}</span>
            </p>
            <p className="order-info">
              Status<span>{order.status}</span>
            </p>
            {renderOrderDetails(order)}
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
            <p className="order-info">
              Order Number<span>{order.receiptNumber}</span>
            </p>
            <p className="order-info">
              Update Date<span>{order.updateDate.substring(0, 10)}</span>
            </p>
            <p className="order-info">
              Status<span>{order.status}</span>
            </p>
            {renderOrderDetails(order)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="order-history-container">
      <h3>Order History</h3>
      {activeOrders.length > 0 && !showArchive && renderActiveOrders()}
      {activeOrders.length === 0 && !showArchive && <p>No active orders available.</p>}
      {showArchive && renderArchiveOrders()}
      <Button type="button" onClick={toggleArchive}>
        {showArchive ? 'View Active Orders' : 'View Archive Orders'}
      </Button>
    </div>
  );
}

export default OrderList;
