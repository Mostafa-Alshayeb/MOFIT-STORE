"use client";

import { useUserItems } from "@/app/context/UserItemsProvider";

export function useFavorites() {
  const { favorites, mounted, addFavorite, removeFavorite, isFavorited } =
    useUserItems();

  return {
    favorites,
    mounted,
    addToFavorite: addFavorite,
    removeFromFavorites: removeFavorite,
    isFavorite: isFavorited,
  };
}
