// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { CartItem, CartItemType } from "@/lib/types";

// interface CartItemProps {
//   item: CartItemType;
//   onUpdateQuantity: (
//     id: string,
//     selectedSize: number | undefined,
//     quantity: number
//   ) => void;
//   onRemove: (id: string, selectedSize?: number) => void;
// }

// export function CartItemCom({
//   item,
//   onUpdateQuantity,
//   onRemove,
// }: CartItemProps) {
//   return (
//     <div className="flex gap-4 border-b border-border/40 py-6">
//       {/* Product Image */}
//       <Link
//         href={`/products/${item.id}`}
//         className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border/40 bg-muted"
//       >
//         <Image
//           src={item.image || "/placeholder.svg"}
//           alt={item.name || "Cart item image"}
//           fill
//           className="object-cover"
//         />
//       </Link>

//       {/* Product Info */}
//       <div className="flex flex-1 flex-col justify-between">
//         <div className="space-y-1">
//           <Link
//             href={`/products/${item.id}`}
//             className="font-semibold hover:text-primary"
//           >
//             {item.name}
//           </Link>
//           <p className="text-sm text-muted-foreground">{item.brand}</p>
//           <p className="text-sm text-muted-foreground">
//             Size: {item.selectedSize}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8 bg-transparent"
//             onClick={() =>
//               onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)
//             }
//             disabled={item.quantity <= 1}
//           >
//             <Minus className="h-3 w-3" />
//           </Button>
//           <span className="w-8 text-center text-sm font-medium">
//             {item.quantity}
//           </span>
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8 bg-transparent"
//             onClick={() =>
//               onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)
//             }
//           >
//             <Plus className="h-3 w-3" />
//           </Button>
//         </div>
//       </div>

//       {/* Price and Remove */}
//       <div className="flex flex-col items-end justify-between">
//         <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-8 w-8 text-destructive hover:text-destructive"
//           onClick={() => onRemove(item.id, item.selectedSize)}
//         >
//           <Trash2 className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, size: number, quantity: number) => void;
  onRemove: (id: string, size: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 border-b border-border/40 py-6">
      {/* Product Image */}
      <Link
        href={`/products/${item.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border/40 bg-muted"
      >
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <Link
            href={`/products/${item.id}`}
            className="font-semibold hover:text-primary"
          >
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">{item.brand}</p>
          <p className="text-sm text-muted-foreground">
            Size: {item.selectedSize}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() =>
              onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)
            }
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() =>
              onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)
            }
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onRemove(item.id, item.selectedSize)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
