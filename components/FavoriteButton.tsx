"use client";

import type React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUserItems } from "@/app/context/UserItemsProvider"; // Hook الجديد
import { useState } from "react";

interface FavoriteButtonProps {
  productId: string;
  size?: "sm" | "default" | "lg" | "icon";
  showLabel?: boolean;
}

export function FavoriteButton({
  productId,
  size = "default",
  showLabel = false,
}: FavoriteButtonProps) {
  const { isFavorited, addFavorite, removeFavorite, mounted } = useUserItems();
  const [loading, setLoading] = useState(false);

  if (!mounted) {
    return (
      <Button variant="ghost" size={size} disabled>
        <Heart className="h-4 w-4" />
      </Button>
    );
  }

  const isFav = isFavorited(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      if (isFav) {
        removeFavorite(productId);
      } else {
        addFavorite(productId);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size={size}
        onClick={handleClick}
        disabled={loading}
        className="transition-colors"
      >
        <Heart
          className={`h-4 w-4 transition-all ${
            isFav ? "fill-primary stroke-primary" : "stroke-current"
          }`}
        />
        {showLabel && (
          <span className="ml-2 text-sm">
            {isFav ? "Favorited" : "Add to Favorites"}
          </span>
        )}
      </Button>
    </motion.div>
  );
}
