import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types';

export interface CartItem {
  product: IProduct;
  quantity: number;
  price: number;
}

const savedCartState = localStorage.getItem('cart');
const initialState: CartItem[] = savedCartState ? JSON.parse(savedCartState) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: IProduct }>) => {
      const { product } = action.payload;
      const existingItem = state.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += product.price;
      } else {
        state.push({ product, quantity: 1, price: product.price });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.product.id === productId);
      if (existingItemIndex !== -1) {
        const existingItem = state[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.price -= existingItem.product.price;
        } else {
          state.splice(existingItemIndex, 1);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: () => {
      localStorage.removeItem('cart');
      return [];
    }, // Return an empty array to clear the cart
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
