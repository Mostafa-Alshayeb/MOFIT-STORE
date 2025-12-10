"use client";

import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useAuth } from "@/hooks/use-auth";
import { products } from "@/lib/products-data";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { isAuthenticated, mounted: authMounted } = useAuth();
  const { favorites, mounted: favoritesMounted } = useFavorites();

  if (!authMounted || !favoritesMounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Heart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h1 className="mb-2 text-2xl font-bold">
              Please login to view favorites
            </h1>
            <p className="mb-6 text-muted-foreground">
              Sign in to manage your wishlist
            </p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <Heart className="h-8 w-8 fill-primary stroke-primary" />
            <h1 className="text-3xl font-bold">My Favorites</h1>
          </div>

          {/* Content */}
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-muted/40 py-16">
              <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">No favorites yet</h2>
              <p className="mb-6 text-center text-muted-foreground">
                Start adding your favorite shoes to build your wishlist
              </p>
              <Link href="/products">
                <Button>Browse Shoes</Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {favoriteProducts.length} item(s) in your wishlist
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoriteProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
