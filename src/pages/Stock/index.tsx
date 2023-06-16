import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/Cart';
import { ISeller, IProduct } from '../../types';
import { GET_SELLERS } from '../../graphql/mutation/product';
import CardsStyle from '../../components/styles/Cards.styled';
import CardStyle from '../../components/styles/Card.styled';
import { addToCart, clearCart } from '../../store/cartSlice';
import { Button } from '../../components/styles/Form.styled';
import { CartWrapper } from '../../components/styles/Cart.styled';
import { RootState } from '../../store';

function Stock() {
  const { data } = useQuery<{ sellers: ISeller[] }>(GET_SELLERS);
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state: RootState) => state.cartstate.isVisible);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart({ product }));
  };

  const handleSellerClick = (seller: ISeller) => {
    setSelectedSeller(seller);
  };

  return (
    <div>
      {selectedSeller ? (
        <div>
          <h3>{selectedSeller.companyName}</h3>
          <p>{selectedSeller.description}</p>
          <CardsStyle>
            {selectedSeller.products.map((product: IProduct) => (
              <CardStyle key={product.id}>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <Button onClick={() => handleAddToCart(product)}>Add</Button>
              </CardStyle>
            ))}
          </CardsStyle>
          <Button
            onClick={() => {
              dispatch(clearCart());
              setSelectedSeller(null);
            }}
          >
            Back to Sellers
          </Button>
          <CartWrapper isVisible={isCartVisible}>
            <Cart />
          </CartWrapper>
        </div>
      ) : (
        <CardsStyle>
          {data?.sellers.map((seller) => (
            <CardStyle key={seller.id} onClick={() => handleSellerClick(seller)}>
              <h5>{seller.companyName}</h5>
              <p>{seller.description}</p>
            </CardStyle>
          ))}
        </CardsStyle>
      )}
    </div>
  );
}

export default Stock;
