"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./use-auth";

export function useFavorites() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated && favorites.length > 0) {
      saveFavoritesToServer();
    }
  }, [favorites, isAuthenticated, mounted]);

  const saveFavoritesToServer = async () => {
    try {
      await fetch("/api/user/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorites }),
      });
    } catch (error) {
      console.error("Error saving favorites to server:", error);
    }
  };

  const addToFavorites = async (productId: string) => {
    if (!productId) return false;

    const updated = [...favorites];
    if (!updated.includes(productId)) {
      updated.push(productId);
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));

      toast({
        title: "Added to favorites",
        description: "Product added to your wishlist",
      });
      return true;
    } else {
      toast({
        title: "Already in favorites",
        description: "This product is already in your wishlist",
      });
      return false;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    const updated = favorites.filter((id) => id !== productId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    toast({
      title: "Removed from favorites",
      description: "Product removed from your wishlist",
    });
    return true;
  };

  const isFavorited = (productId: string) => favorites.includes(productId);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    mounted,
  };
}
