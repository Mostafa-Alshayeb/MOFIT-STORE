"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.id}`}>
        <Card className="group overflow-hidden border-border/40 transition-all hover:border-primary/50 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.trending && (
                <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Trending
                </div>
              )}
              <div
                className="absolute right-3 top-3"
                onClick={(e) => e.preventDefault()}
              >
                <FavoriteButton productId={product.id} size="icon" />
              </div>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold leading-tight group-hover:text-primary">
                    {product.name}
                  </h3>
                </div>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
