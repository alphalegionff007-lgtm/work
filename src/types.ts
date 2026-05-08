export type Category = 'Backpacks' | 'Briefcases' | 'Duffle Bags' | 'Wallets';

export interface Product {
  id: string;
  name: string;
  nameBn?: string;
  price: number;
  category: Category;
  collection: 'Foundry' | 'Bastion';
  description: string;
  descriptionBn?: string;
  images: string[]; // [primary, side, interior, detail]
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestseller?: boolean;
  dimensions?: string;
  materials?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
}
