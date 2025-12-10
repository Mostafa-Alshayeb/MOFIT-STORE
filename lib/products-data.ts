import type { Product } from "./types";

export const products: Product[] = [
  // Nike Products
  {
    id: "nike-air-max-90",
    name: "Air Max 90",
    brand: "Nike",
    price: 130,
    image: "/nike-air-max-90-sneakers-white-and-red.jpg",
    description:
      "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
    trending: true,
  },
  {
    id: "nike-dunk-low",
    name: "Dunk Low",
    brand: "Nike",
    price: 110,
    image: "/nike-dunk-low-sneakers-black-and-white-panda.jpg",
    description:
      "Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    trending: true,
  },
  {
    id: "nike-pegasus-40",
    name: "Pegasus 40",
    brand: "Nike",
    price: 140,
    image: "/nike-pegasus-40-running-shoes-blue.jpg",
    description:
      "Responsive cushioning in the Pegasus provides an energized ride for everyday running.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
  },
  {
    id: "nike-blazer-mid",
    name: "Blazer Mid 77",
    brand: "Nike",
    price: 115,
    image: "/nike-blazer-mid-77-vintage-white-sneakers.jpg",
    description:
      "The Nike Blazer Mid 77 Vintage adds a retro look to the classic basketball shoe.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },

  // Adidas Products
  {
    id: "adidas-ultraboost",
    name: "Ultraboost 23",
    brand: "Adidas",
    price: 190,
    image: "/adidas-ultraboost-23-running-shoes-black.jpg",
    description:
      "Experience endless energy with Ultraboost. Responsive cushioning returns energy to your stride.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
    trending: true,
  },
  {
    id: "adidas-samba",
    name: "Samba Classic",
    brand: "Adidas",
    price: 90,
    image: "/adidas-samba-classic-black-white-sneakers.jpg",
    description:
      "The iconic Samba with a rich history in soccer, now a streetwear staple.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    trending: true,
  },
  {
    id: "adidas-gazelle",
    name: "Gazelle",
    brand: "Adidas",
    price: 100,
    image: "/adidas-gazelle-suede-sneakers-navy-blue.jpg",
    description:
      "A timeless classic with a suede upper and signature 3-Stripes.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "adidas-forum-low",
    name: "Forum Low",
    brand: "Adidas",
    price: 110,
    image: "/adidas-forum-low-white-sneakers.jpg",
    description:
      "Basketball heritage meets modern street style in the Forum Low.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },

  // Puma Products
  {
    id: "puma-suede-classic",
    name: "Suede Classic",
    brand: "Puma",
    price: 75,
    image: "/puma-suede-classic-red-sneakers.jpg",
    description:
      "The Puma Suede hit the scene in 1968 and has been changing the game ever since.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    trending: true,
  },
  {
    id: "puma-rs-x",
    name: "RS-X",
    brand: "Puma",
    price: 120,
    image: "/puma-rs-x-colorful-chunky-sneakers.jpg",
    description:
      "Bold, unapologetic style with a chunky silhouette and vibrant colors.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
  },
  {
    id: "puma-clyde",
    name: "Clyde Court",
    brand: "Puma",
    price: 130,
    image: "/puma-clyde-court-basketball-shoes.jpg",
    description:
      "Performance basketball shoe with a nod to the legendary Walt Clyde Frazier.",
    category: "Men",
    sizes: [41, 42, 43, 44, 45, 46],
  },
  {
    id: "puma-cali",
    name: "Cali Sport",
    brand: "Puma",
    price: 85,
    image: "/puma-cali-sport-white-womens-sneakers.jpg",
    description:
      "West Coast vibes meet athletic style in this women's exclusive.",
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
  },

  // New Balance Products
  {
    id: "nb-530",
    name: "nb-530",
    brand: "New Balance",
    price: 185,
    image:
      "/6089a308-c6c3-4535-a8c1-22dacf86f2e1.ccb1f259801f2ee00230ef2134c372d6.webp",
    description:
      "Premium running shoe representing the pinnacle of New Balance craftsmanship.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
    trending: true,
  },
  {
    id: "nb-574",
    name: "574 Core",
    brand: "New Balance",
    price: 90,
    image: "/new-balance-4948-6335634-2.webp",
    description:
      "New Balance’s most iconic silhouette combining comfort and versatility.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    trending: true,
  },
  {
    id: "nb-2002r",
    name: "2002R",
    brand: "New Balance",
    price: 160,
    image: "/new-balance-2002r-protection-pack-grey.jpg",
    description:
      "Refined running shoe with ABZORB and N-ergy cushioning for superior comfort.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "nb-327",
    name: "327",
    brand: "New Balance",
    price: 100,
    image: "/Q2_2023_04_BLACK_NB-327_CORE-REFRESH_U_GHOST_05004.webp",
    description:
      "Retro-inspired design with a modern twist and oversized logo.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    trending: true,
  },

  // Asics Products
  {
    id: "asics-gel-nytron-2025",
    name: "GEL‑NYTRON-BLACK 2025",
    brand: "Asics",
    price: 170,
    image: "/asics-men-gel-nyc-black-black-2025-1203a739-001.webp",
    description:
      "Premium running shoe combining modern cushioning with bold street-ready style.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
    trending: true,
  },
  {
    id: "asics-gel-kayano-31",
    name: "GEL‑Kayano 31",
    brand: "Asics",
    price: 200,
    image: "/206751800-1-white.avif",
    description:
      "Reliable stability trainer with enhanced cushioning for long distance runs.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
  },
  {
    id: "asics-novablast-4",
    name: "Novablast 4",
    brand: "Asics",
    price: 190,
    image: "/1011b693-401-1_1.jpg",
    description:
      "Lightweight, highly responsive running shoe built for speed and comfort.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    trending: true,
  },
  {
    id: "asics-gel-cumulus-26",
    name: "GEL‑Cumulus 26",
    brand: "Asics",
    price: 140,
    image: "/01-ASICS-F34RUASIA-ASI11B792102-White.webp",
    description:
      "Daily running favourite with balanced cushioning and smooth ride.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "asics-gel-pulse-14",
    name: "GEL‑Pulse 14",
    brand: "Asics",
    price: 110,
    image: "/asics-gel-pulse-14-stiffness-21276661-main.webp",
    description:
      "Budget-friendly versatile shoe for fitness, gym workouts and everyday wear.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "asics-gel-quantum-360-7",
    name: "GEL‑Quantum 360 7",
    brand: "Asics",
    price: 200,
    image: "/1201a876-003-2_1.webp",
    description:
      "Full-length GEL cushioning and futuristic design for premium comfort and style.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
  },

  // Under Armour Products
  {
    id: "ua-hovr-phantom-3",
    name: "HOVR Phantom 3",
    brand: "Under Armour",
    price: 150,
    image: "/UA-HOVR-PHANTOM-3-3025516-003-600x600.jpg",
    description:
      "UA HOVR cushioning provides energy return and comfort for long-distance running.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
    featured: true,
    trending: true,
  },
  {
    id: "ua-charged-assert-10",
    name: "Charged Assert 10",
    brand: "Under Armour",
    price: 85,
    image: "/under-armour-ua-flow-futr-x-3-men-s-basketball-shoes.jpg",
    description:
      "Lightweight running shoe with Charged cushioning for superior responsiveness.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "ua-curry-flow-11",
    name: "Curry Flow 11",
    brand: "Under Armour",
    price: 160,
    image:
      "/Screenshot_2024-10-04_at_12-18-53_3027637-100_PAIR_AVIF_Image_1836_1950_pixels_Scaled_44__12718.webp",
    description:
      "Stephen Curry’s signature shoe with UA Flow cushioning and superior traction.",
    category: "Men",
    sizes: [41, 42, 43, 44, 45, 46],
    trending: true,
  },
  {
    id: "ua-hovr-sonic-5",
    name: "HOVR Sonic 5",
    brand: "Under Armour",
    price: 120,
    image:
      "/under-armour-men-s-hovr-sonic-5-running-shoes-حذاء-أندر-آرمر-هوفر-سونيك-5-رانينج-للرجال-لون-أسود.jpg",
    description:
      "Breathable engineered mesh with HOVR cushioning for everyday performance.",
    category: "Unisex",
    sizes: [40, 41, 42, 43, 44, 45],
  },

  // **Merged from product[]**
  {
    id: "nike-zoom-fly-2025",
    name: "Nike Zoom Fly 2025",
    category: "Sports Shoes",
    price: 185,
    image: "/ZOOM+FLY+5.avif",
    brand: "Nike",
    description: "High-performance running shoe designed for speed.",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "adidas-ultraboost-custom",
    name: "Adidas Ultraboost",
    category: "Running Shoes",
    price: 14,
    image: "/adidas-ultraboost-running-shoes-black.jpg",
    brand: "Adidas",
    description: "Responsive Ultraboost cushioning for maximum comfort.",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "nb-990v6",
    name: "New Balance 990v6",
    category: "Running Shoes",
    price: 199,
    image: "/new-balance-fresh-foam-x-more-v-5-21889889-main.webp",
    brand: "New Balance",
    description: "Premium comfort running shoe with modern foam technology.",
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "nike-pro-training",
    name: "Nike Pro Training",
    category: "Training Wear",
    price: 240,
    image: "/nike-pro-training-shirt-black-athletic-wear.jpg",
    brand: "Nike",
    description: "Breathable training shirt designed for performance.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "adidas-tiro-track-pants",
    name: "Adidas Tiro Track Pants",
    category: "Sports Pants",
    price: 99,
    image: "/adidas-track-pants-black-with-stripes.jpg",
    brand: "Adidas",
    description: "Comfortable sports pants designed for mobility.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "puma-running-jacket",
    name: "Puma Running Jacket",
    category: "Sports Jacket",
    price: 160,
    image: "/puma-running-jacket-athletic-wear.jpg",
    brand: "Puma",
    description: "Lightweight running jacket for all-weather training.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
];
