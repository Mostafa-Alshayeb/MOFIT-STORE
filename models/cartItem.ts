// models/cartItem.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface ICartItem {
  userId: string;
  productId: string; // slug
  quantity: number;
  selectedSize: number;
  price: number;
  description: string;
  brand: string;
  sizes: number;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    userId: { type: String, required: true },

    productId: {
      type: String,
      required: true, // slug
    },

    quantity: { type: Number, required: true },
    selectedSize: { type: Number, required: true },

    price: { type: Number, required: true },
    description: String,
    brand: String,
    sizes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// منع تكرار نفس المنتج + نفس المقاس
cartItemSchema.index(
  { userId: 1, productId: 1, selectedSize: 1 },
  { unique: true }
);

const CartItem =
  models.CartItem || model<ICartItem>("CartItem", cartItemSchema);
export { CartItem };
