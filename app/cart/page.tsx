// "use client";

// import Link from "next/link";
// // import { CartItem } from "@/components/CartItem";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ShoppingBag } from "lucide-react";
// import { motion } from "framer-motion";
// import { useUserItems } from "@/app/context/UserItemsProvider";
// import { CartItemCom } from "@/components/CartItem";

// export default function CartPage() {
//   const {
//     cart,
//     updateCartItemQuantity,
//     removeFromCart,
//     mounted,
//     getCartTotal,
//   } = useUserItems();

//   if (!mounted) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <main className="flex-1" />
//       </div>
//     );
//   }

//   const total = getCartTotal();

//   return (
//     <div className="flex min-h-screen flex-col">
//       <main className="flex-1">
//         <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//           <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
//             Shopping Cart
//           </h1>

//           {cart.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border/40 p-8 text-center"
//             >
//               <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
//               <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
//               <p className="mb-6 text-muted-foreground">
//                 Add some shoes to get started
//               </p>
//               <Link href="/products">
//                 <Button>Browse Products</Button>
//               </Link>
//             </motion.div>
//           ) : (
//             <div className="grid gap-8 lg:grid-cols-3">
//               {/* Cart Items */}
//               <div className="lg:col-span-2">
//                 <Card className="border-border/40">
//                   <CardHeader>
//                     <CardTitle>Items ({cart.length})</CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-0">
//                     <div className="divide-y divide-border/40 px-6">
//                       {cart.map((item, index) => (
//                         <motion.div
//                           key={`${item.id}-${item.selectedSize}`}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.3, delay: index * 0.05 }}
//                         >
//                           <CartItemCom
//                             item={item}
//                             onUpdateQuantity={(id, selectedSize, quantity) =>
//                               selectedSize &&
//                               updateCartItemQuantity(id, selectedSize, quantity)
//                             }
//                             onRemove={(id, selectedSize) =>
//                               selectedSize && removeFromCart(id, selectedSize)
//                             }
//                           />
//                         </motion.div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Order Summary */}
//               <div className="lg:col-span-1">
//                 <Card className="sticky top-24 border-border/40">
//                   <CardHeader>
//                     <CardTitle>Order Summary</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Subtotal</span>
//                       <span className="font-medium">${total.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Shipping</span>
//                       <span className="font-medium">
//                         {total >= 100 ? "FREE" : "$10.00"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Tax</span>
//                       <span className="font-medium">
//                         ${(total * 0.08).toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="border-t border-border/40 pt-4">
//                       <div className="flex justify-between">
//                         <span className="font-semibold">Total</span>
//                         <span className="text-xl font-bold">
//                           $
//                           {(
//                             total +
//                             (total >= 100 ? 0 : 10) +
//                             total * 0.08
//                           ).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex-col gap-3">
//                     <Link href="/checkout" className="w-full">
//                       <Button size="lg" className="w-full">
//                         Proceed to Checkout
//                       </Button>
//                     </Link>
//                     <Link href="/products" className="w-full">
//                       <Button
//                         variant="outline"
//                         size="lg"
//                         className="w-full bg-transparent"
//                       >
//                         Continue Shopping
//                       </Button>
//                     </Link>
//                   </CardFooter>
//                 </Card>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem } from "@/components/CartItem";
export default function CartPage() {
  const { cart, updateQuantity, removeItem, total, mounted } = useCart();

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border/40 p-8 text-center"
            >
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">
                Add some shoes to get started
              </p>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>Items ({cart.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/40 px-6">
                      {cart.map((item, index) => (
                        <motion.div
                          key={`${item.id}-${item.selectedSize}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <CartItem
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-border/40">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {total >= 100 ? "FREE" : "$10.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">
                        ${(total * 0.02).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border/40 pt-4">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold">
                          $
                          {(
                            total +
                            (total >= 100 ? 0 : 10) -
                            total * 0.1
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Link href="/checkout" className="w-full">
                      <Button size="lg" className="w-full">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/products" className="w-full">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full bg-transparent"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
