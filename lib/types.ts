// // ================= PRODUCT =================
// export interface Product {
//   _id: string;
//   name: string;
//   brand: string;
//   price: number;
//   image: string;
//   description: string;
//   category: string;
//   sizes: number[];
//   featured?: boolean;
//   trending?: boolean;
// }

// // نفس المنتج من DB (اختياري لو حاب)
// export type ProductDB = Product;

// // ================= CART =================
// export interface CartItemType {
//   _id: string; // معرف المنتج
//   name: string;
//   brand: string;
//   image: string;
//   price: number;

//   selectedSize: number;
//   quantity: number;
// }

// // ================= USER =================
// export interface AuthState {
//   isAuthenticated: boolean;
//   user: User | null;
// }

// export interface User {
//   _id?: string;
//   name: string;
//   email: string;
//   password?: string;
// }

// // ================= ORDER =================
// export interface Order {
//   id: string;
//   userId: string;
//   items: CartItemType[];
//   total: number;
//   status: "pending" | "completed" | "failed";
//   createdAt: string;
//   shippingAddress: ShippingAddress;
//   paymentDetails: PaymentDetails;
// }

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
// }

// export interface PaymentDetails {
//   cardName: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// // ================= FAVORITE =================
// export interface Favorite {
//   id: string;
//   userId: string;
//   productId: string;
//   createdAt: string;
// }

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
  sizes: number[];
  featured?: boolean;
  trending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export interface CartItemType {
  userId?: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: number;
  image?: string;
  brand?: string;
  productId: string;
  sizes?: number;
  description?: string;
}

export interface ICartItem extends Document {
  userId?: string;
  productId: string;
  quantity: number;
  selectedSize?: number;
  price: number;
  createdAt?: Date;
}
