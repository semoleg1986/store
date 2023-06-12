export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: {
    id: string;
    name: string;
  };
}

export interface LoginData {
  username: string;
  password: string;
}

export interface CartItem {
  quantity: number;
  product: {
    price: number;
  };
}
