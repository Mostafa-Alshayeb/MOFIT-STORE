interface BrandLogoProps {
  brand: "Nike" | "Adidas" | "Puma" | "New Balance"
}

export function BrandLogo({ brand }: BrandLogoProps) {
  return (
    <div className="flex h-24 items-center justify-center rounded-lg border border-border/40 bg-card px-8 transition-all hover:border-primary/50 hover:shadow-md">
      <span className="text-xl font-bold tracking-tight">{brand}</span>
    </div>
  )
}
