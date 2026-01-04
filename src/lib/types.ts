export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  inventory: number;
  promotionId?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number; // as a percentage
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    quantity: number;
    name: string;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
