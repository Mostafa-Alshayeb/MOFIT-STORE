import mongoose, { Schema, model, models, Document } from "mongoose";

interface CartItem {
  productId: string;
  quantity: number;
  selectedSize?: string;
  price: number;
}

export interface IUser extends Document {
  email: string;
  password: string;
  cart: CartItem[];
  favorites: string[];
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    selectedSize: { type: String },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },

    cart: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", userSchema);
export { User };
