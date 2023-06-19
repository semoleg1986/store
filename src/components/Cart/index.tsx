/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { ICartItem, IProduct } from '../../types';

import { addToCart, removeFromCart } from '../../store/cartSlice';
import {
  ButtonP,
  CartTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TotalCell,
  TotalRow,
} from '../styles/Cart.styled';
import { toggleCart } from '../../store/cartState';
import { Button } from '../styles/Form.styled';

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };
  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart({ product }));
  };

  const getTotalCost = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return 0;
    }

    return cartItems
      .reduce((total: number, item: ICartItem) => total + item.quantity * item.product.price, 0)
      .toFixed(2);
  };

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleCheckout = () => {
    dispatch(toggleCart());
    navigate('/order');
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <CartTable>
          <TableHead>
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Total</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>
                  <ButtonP onClick={() => handleRemoveFromCart(item.product.id)}>-</ButtonP>
                  {item.quantity}
                  <ButtonP onClick={() => handleAddToCart(item.product)}>+</ButtonP>
                </TableCell>
                <TableCell>${item.product.price}</TableCell>
                <TableCell>${(item.quantity * item.product.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot>
            <TotalRow>
              <td colSpan={2} />
              <TotalCell>Total:</TotalCell>
              <TotalCell>${getTotalCost()}</TotalCell>
            </TotalRow>
          </tfoot>
        </CartTable>
      )}
      {cartItems.length > 0 && <Button onClick={handleCheckout}>Checkout</Button>}
      {cartItems.length > 0 && (
        <p>
          or{' '}
          <a href="#" role="button" onClick={handleToggleCart}>
            continue shopping &rarr;
          </a>
        </p>
      )}
      {/* <Button onClick={handleToggleCart}>Exit</Button> */}
    </div>
  );
}

export default Cart;
