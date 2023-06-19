import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { CREATE_ORDER } from '../../graphql/mutation/order';
import { clearCart } from '../../store/cartSlice';
import { GET_BUYER_BY_ID } from '../../graphql/mutation/auth';
import {
  CartTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/styles/Cart.styled';
import './index.css';
import { Button } from '../../components/styles/Form.styled';

function Order() {
  const buyerId = useSelector((state: RootState) => state.auth.idBuyer);
  const cartItems = useSelector((state: RootState) => state.cart);
  const [createOrder] = useMutation(CREATE_ORDER);
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_BUYER_BY_ID, {
    variables: { buyerId },
  });
  if (data) console.log(data.buyerById.name);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/order-list');
    }
  }, [cartItems, navigate]);

  const handleCreateOrder = async () => {
    try {
      const productIds = cartItems.map((item) => item.product.id);
      const quantities = cartItems.map((item) => item.quantity);
      const sellerId = cartItems.find((item) => item)?.product?.seller?.id;
      console.log(productIds); // добавил consolelog для проверки ProductsIds
      await createOrder({
        variables: {
          sellerId,
          buyerId,
          name: data.buyerById.name,
          surname: data.buyerById.surname,
          phoneNumber: data.buyerById.phoneNumber,
          address,
          email,
          productIds,
          quantities,
        },
      });
      console.log(sellerId);
      dispatch(clearCart());
      navigate('/order-placed');
    } catch (err) {
      console.log('Error crreating order:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  const totalPrice = cartItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="order-confirmation">
      <div className="contact-info">
        <h3>Contact information</h3>
        <form>
          <label htmlFor="email">
            Email address
            <input type="email" value="" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <h3>Shipping information</h3>
          <label htmlFor="name">
            First Name
            <input type="text" value={data.buyerById.name} readOnly />
          </label>
          <br />
          <label htmlFor="surname">
            Last Name
            <input type="text" value={data.buyerById.surname} readOnly />
          </label>
          <br />
          <label htmlFor="phoneNumber">
            Phone
            <input
              type="text"
              value={phoneNumber || data.buyerById?.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="address">
            Address
            <input type="text" value="" onChange={(e) => setAddress(e.target.value)} />
          </label>
          <br />
        </form>
      </div>

      <div className="order-summary">
        <h3>Order summary</h3>
        <CartTable>
          <TableHead>
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Subtotal</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.product.price}</TableCell>
                <TableCell>{(item.quantity * item.product.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>Total:</TableCell>
              <TableCell>{totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </CartTable>
      </div>
      <Button type="button" onClick={handleCreateOrder}>
        Confirm order
      </Button>
    </div>
  );
}

export default Order;
