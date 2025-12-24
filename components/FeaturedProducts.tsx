"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { products } from "@/lib/products-data";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { useUserItems } from "@/app/context/UserItemsProvider";

export function FeaturedProducts() {
  const { addFavorite, removeFavorite, isFavorited, mounted } = useUserItems();

  const handleFavoriteClick = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorited(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  if (!mounted) return null;

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Discover the latest and best products from leading brands
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {products.slice(-6).map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group overflow-hidden border border-border rounded-lg hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg h-9 w-9 sm:h-10 sm:w-10"
                    onClick={(e) =>
                      handleFavoriteClick(e, product.id.toString())
                    }
                  >
                    <HeartIcon
                      className={`h-4 w-4 transition-colors ${
                        isFavorited(product.id.toString())
                          ? "fill-black text-black"
                          : "text-black"
                      }`}
                    />
                  </Button>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
                    {product.brand}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-lg sm:text-xl font-bold">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="text-sm sm:text-base bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
