"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { products } from "@/lib/products-data";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Link href="/products" className="mt-4 inline-block">
              <Button variant="outline">Back to Products</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} (Size ${selectedSize}) has been added to your cart`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square overflow-hidden rounded-lg border border-border/40 bg-muted"
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.trending && (
                <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Trending
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {product.brand}
                    </p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                      {product.name}
                    </h1>
                  </div>
                  {/* Favorite Button */}
                  <FavoriteButton productId={product.id} size="lg" />
                </div>

                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">${product.price}</p>
                  <p className="text-sm text-muted-foreground">USD</p>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Category:</span>
                  <span className="text-muted-foreground">
                    {product.category}
                  </span>
                </div>

                {/* Size Selection */}
                <div className="space-y-3 border-t border-border/40 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Select Size</h3>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Size Guide
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative flex h-12 items-center justify-center rounded-md border transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/40 hover:border-primary/50"
                        }`}
                      >
                        <span className="font-medium">{size}</span>
                        {selectedSize === size && (
                          <Check className="absolute right-1 top-1 h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="space-y-3 border-t border-border/40 pt-6">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Free shipping on orders over $100
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
