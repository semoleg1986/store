import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../components/Cart';
import { Product } from '../../types';
import { GET_SELLERS } from '../../graphql/mutation/product';
import CardsStyle from '../../components/Cards/Cards.styled';
import CardStyle from '../../components/Card/Card.styled';
import { addToCart } from '../../store/cartSlice';
import { Button } from '../../components/Form/Form.styled';
import { CartWrapper } from '../../components/Cart/Cart.styled';
import { RootState } from '../../store';

interface Seller {
  id: string;
  companyName: string;
  description: string;
  products: Product[];
}

function Stock() {
  const { data } = useQuery<{ sellers: Seller[] }>(GET_SELLERS);
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state: RootState) => state.cartstate.isVisible);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product }));
  };

  const handleSellerClick = (seller: Seller) => {
    setSelectedSeller(seller);
  };

  return (
    <>
      {selectedSeller ? (
        <div>
          <h3>{selectedSeller.companyName}</h3>
          <p>{selectedSeller.description}</p>
          <CardsStyle>
            {selectedSeller.products.map((product: Product) => (
              <CardStyle key={product.id}>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <Button onClick={() => handleAddToCart(product)}>Add</Button>
              </CardStyle>
            ))}
          </CardsStyle>
          <Button onClick={() => setSelectedSeller(null)}>Back to Sellers</Button>
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

      <CartWrapper isVisible={isCartVisible}>
        <Cart />
      </CartWrapper>
    </>
  );
}

export default Stock;
