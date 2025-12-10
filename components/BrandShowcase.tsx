import Link from "next/link";

export function BrandShowcase() {
  const brands = [
    {
      name: "Nike",
      logo: "/67979fc2-9bc6-4ef1-a91a-9f8129c57645_1500x1500.png",
      link: "/products?brand=Nike",
    },
    {
      name: "Adidas",
      logo: "/adidas-trefoil-white-logo-hd-png-701751694777569s4q66v6yry.png",
      link: "/products?brand=Adidas",
    },
    {
      name: "New Balance",
      logo: "/images.png",
      link: "/products?brand=New Balance",
    },
    {
      name: "Puma",
      logo: "/puma-logo-white-symbol-with-name-clothes-design-icon-abstract-football-illustration-with-black-background-free-vector.jpg",
      link: "/products?brand=Puma",
    },
    {
      name: "Under Armour",
      logo: "/under_armour-brandlogo.net_-300x300.png",
      link: "/products?brand=Under Armour",
    },
    {
      name: "Asics",
      logo: "/w5oIJGjg1576739247.png",
      link: "/products?brand=Asics",
    },
  ];

  return (
    <section className="border-b border-border  py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8  ">
          <h1 className="text-base font-semibold tracking-wider  text-muted-foreground uppercase">
            Featured Brands
          </h1>
          <h2 className="text-sm font-semibold tracking-wider  text-muted-foreground uppercase">
            Shop from the world's leading athletic footwear brands
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <Link
              href={brand.link}
              key={brand.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-12 w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
