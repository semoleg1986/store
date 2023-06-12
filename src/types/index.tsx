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
  seller: {
    id: string;
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

export interface Order {
  id: string;
  receiptNumber: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  status: string;
  updateDate: string;
  orderitemSet: OrderItem[];
}

export interface OrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}
