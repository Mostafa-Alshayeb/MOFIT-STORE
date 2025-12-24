// models/Product.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
  name: string;
  productId: string; // slug
  price: number;
  image: string;
  category?: string;
  sizes: number;
  description: string;
  brand: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    productId: { type: String, required: true, unique: true }, // slug

    price: { type: Number, required: true },
    image: { type: String, required: true },

    category: String,
    sizes: { type: Number, default: 0 },

    description: { type: String, default: "" },
    brand: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", productSchema);
export default Product;
