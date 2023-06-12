import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { CREATE_ORDER } from '../../graphql/mutation/order';
// import { clearCart } from '../../store/cartSlice';
import { GET_BUYER_BY_ID } from '../../graphql/mutation/auth';
import {
  CartTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/Cart/Cart.styled';

function Order() {
  const buyerId = useSelector((state: RootState) => state.auth.idBuyer);
  const cartItems = useSelector((state: RootState) => state.cart);
  const [createOrder] = useMutation(CREATE_ORDER);

  const { loading, error, data } = useQuery(GET_BUYER_BY_ID, {
    variables: { buyerId },
  });
  if (data) console.log(data.buyerById.name);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    try {
      const productsIds = cartItems.map((item) => item.product.id);
      const quantities = cartItems.map((item) => item.quantity);
      await createOrder({
        variables: {
          // нужно доабвить sellerId из ls
          buyerId,
          name: data.buyerById.name,
          surname: data.buyerById.surname,
          phoneNumber: data.buyerById.phoneNumber,
          address: data.buyerById.address,
          email: data.buyerById.user.email,
          productsIds,
          quantities,
        },
      });
      console.log(productsIds);
    } catch (err) {
      console.log('Error crreating order:', err);
      navigate('orderlist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Order Details</h1>
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
              <TableCell>{item.quantity * item.product.price}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow>
          <TableCell>Total:</TableCell>
          <TableCell>{totalPrice}.00</TableCell>
        </TableRow>
      </CartTable>

      <h2>Personal Information</h2>
      {/* Форма для имени, фамилии, телефона и адреса */}
      <form>
        <label htmlFor="name">
          First Name:
          <input type="text" value={data.buyerById.name} readOnly />
        </label>
        <br />
        <label htmlFor="surname">
          Last Name:
          <input type="text" value={data.buyerById.surname} readOnly />
        </label>
        <br />
        <label htmlFor="phoneNumber">
          Phone:
          <input
            type="text"
            value={phoneNumber || data.buyerById?.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="address">
          Address:
          <input
            type="text"
            value={address || data.buyerById?.address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </form>
      <button type="button" onClick={handleCreateOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Order;
