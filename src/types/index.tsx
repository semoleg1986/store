export interface IProduct {
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

export interface ILoginData {
  username: string;
  password: string;
}

export interface ICartItem {
  quantity: number;
  product: {
    price: number;
  };
}

export interface IOrder {
  id: string;
  receiptNumber: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  status: string;
  updateDate: string;
  orderitemSet: IOrderItem[];
}

export interface IOrderItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

export interface ISeller {
  id: string;
  companyName: string;
  description: string;
  products: IProduct[];
}
