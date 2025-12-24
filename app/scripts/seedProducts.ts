// scripts/seedProducts.ts
import mongoose from "mongoose";
import Product from "@/models/Product";
import { products } from "@/lib/products-data";

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/yourdbname"); // غير الرابط حسبك
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Products seeded!");
  await mongoose.disconnect();
}

seed().catch(console.error);
