import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { CREATE_ORDER } from '../../graphql/mutation/order';
import { clearCart } from '../../store/cartSlice';
import { GET_BUYER_BY_ID } from '../../graphql/mutation/auth';
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

  const [phoneEditable, setPhoneEditable] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setPhoneEditable(data?.buyerById?.phoneNumber || '');
  }, [data?.buyerById?.phoneNumber]);

  const handleCreateOrder = async () => {
    try {
      const productIds = cartItems.map((item) => item.product.id);
      const quantities = cartItems.map((item) => item.quantity);
      const sellerId = cartItems.find((item) => item)?.product?.seller?.id;
      await createOrder({
        variables: {
          sellerId,
          buyerId,
          name: data.buyerById.name,
          surname: data.buyerById.surname,
          phoneNumber: phoneEditable,
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="small-text">(enter your contact email addess)</span>
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
              value={phoneEditable}
              onChange={(e) => setPhoneEditable(e.target.value)}
            />
            <span className="small-text">(you can change your contact phone number)</span>
          </label>
          <br />
          <label htmlFor="address">
            Address
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <span className="small-text">(enter shipping address)</span>
          </label>
          <br />
        </form>
      </div>

      <div className="order-summary">
        <h3>Order summary</h3>
        <table className="order-table">
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product.id} className="order-product">
                <td>{item.product.name}</td>
                <td>{item.product.description}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * item.product.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <td>Total:</td>
              <td>{totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button type="button" onClick={handleCreateOrder}>
        Confirm order
      </Button>
    </div>
  );
}

export default Order;
