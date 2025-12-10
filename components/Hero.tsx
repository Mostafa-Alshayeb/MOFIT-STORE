import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full h-screen lg:h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/professional-athlete-running-in-premium-sportswear.jpg"
          alt="Hero"
          className="w-full h-full opacity-80"
        />
        {/* Light gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/30" />
      </div>

      <div className="container relative mx-auto h-full px-4">
        <div className="flex h-full max-w-2xl flex-col justify-center gap-6">
          <div className="inline-block">
            <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              New Collection 2025
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary-foreground text-balance">
            Unleash Your Athletic Potential
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
            Discover the latest collections of sports shoes and apparel from top
            global brands.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary cursor-pointer"
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
