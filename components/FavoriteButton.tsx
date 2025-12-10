// "use client";

// import type React from "react";

// import { Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useFavorites } from "@/hooks/use-favorites";
// import { motion } from "framer-motion";

// interface FavoriteButtonProps {
//   productId: string;
//   size?: "sm" | "default" | "lg" | "icon";
//   showLabel?: boolean;
// }

// export function FavoriteButton({
//   productId,
//   size = "default",
//   showLabel = false,
// }: FavoriteButtonProps) {
//   const { isFavorited, addToFavorites, removeFromFavorites, loading, mounted } =
//     useFavorites();

//   if (!mounted) {
//     return (
//       <Button variant="ghost" size={size} disabled>
//         <Heart className="h-4 w-4" />
//       </Button>
//     );
//   }

//   const isFav = isFavorited(productId);

//   const handleClick = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isFav) {
//       await removeFromFavorites(productId);
//     } else {
//       await addToFavorites(productId);
//     }
//   };

//   return (
//     <motion.div whileTap={{ scale: 0.95 }}>
//       <Button
//         variant="ghost"
//         size={size}
//         onClick={handleClick}
//         disabled={loading}
//         className="transition-colors"
//       >
//         <Heart
//           className={`h-4 w-4 transition-all ${
//             isFav ? "fill-primary stroke-primary" : "stroke-current"
//           }`}
//         />
//         {showLabel && (
//           <span className="ml-2 text-sm">
//             {isFav ? "Favorited" : "Add to Favorites"}
//           </span>
//         )}
//       </Button>
//     </motion.div>
//   );
// }
"use client";

import type React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { motion } from "framer-motion";

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
  const { isFavorited, addToFavorites, removeFromFavorites, loading, mounted } =
    useFavorites();

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

    if (isFav) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
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
