export interface Product {
  _id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  sizes: string[];
  description: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface CartItemType {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  discount: string;
  productId: string;
}

export interface Order {
  _id: string;
  items: CartItemType[];
  totalAmount: number;
  paymentId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Invoice {
  orderId: string;
  items: { title: string; brand: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  delivery: number;
  totalAmount: number;
  paymentMethod: string;
  date: string;
  customerName: string;
  customerEmail: string;
}
