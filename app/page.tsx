import { Hero } from "@/components/Hero";
import TrendingShoes from "@/components/TrendingShoes";
import { BrandShowcase } from "@/components/BrandShowcase";
import { FeaturedProducts } from "@/components/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className=" flex-1">
        {/* Hero Section */}
        <Hero />
        <BrandShowcase />
        {/* Featured Products */}
        <FeaturedProducts />
        {/* Trending Shoes */}
        <TrendingShoes />
      </main>
    </div>
  );
}
