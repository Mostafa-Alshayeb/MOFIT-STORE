// models/favorites.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IFavorite {
  userId: mongoose.Types.ObjectId;
  productId: string; // slug
  createdAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: String, required: true }, // slug
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Favorite = models.Favorite || model("Favorite", favoriteSchema);
export default Favorite;
