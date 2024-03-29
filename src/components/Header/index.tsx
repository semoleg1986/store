import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ROOT_PAGE, STOCK_PAGE, ORDER_PAGE } from '../../routes';
import { HeaderStyled, CustomNavLink, CartButton } from './Header.styled';
import { toggleCart } from '../../store/cartState';

function Header() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  // const isCartVisible = useSelector((state: RootState) => state.cartstate.isVisible);
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  const getTotalQuantity = () => cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <HeaderStyled>
      <CustomNavLink to={ROOT_PAGE}>Home</CustomNavLink>
      <CustomNavLink to={STOCK_PAGE}>Stock</CustomNavLink>
      <CustomNavLink to={ORDER_PAGE}>Order</CustomNavLink>
      <CartButton onClick={handleToggleCart}>
        <i>&#128722;</i>
        <p>{getTotalQuantity()}</p>
      </CartButton>
    </HeaderStyled>
  );
}

export default Header;
