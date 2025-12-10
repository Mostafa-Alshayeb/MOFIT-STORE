import React from "react";
import { ProductCard } from "./ProductCard";
import { products } from "@/lib/products-data";

const FeaturedCollection = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Collection
          </h2>
          <p className="mt-2 text-muted-foreground">
            Handpicked premium sneakers for the discerning athlete
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
