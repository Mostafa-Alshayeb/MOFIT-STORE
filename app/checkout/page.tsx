"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, mounted } = useCart();
  const { isAuthenticated, user, loading } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [loading, isAuthenticated, router]);

  if (!mounted || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (cart.length === 0) {
    router.push("/cart");
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
              <h1 className="mb-2 text-3xl font-bold">Your cart is empty</h1>
              <p className="mb-6 text-muted-foreground">
                Add items to your cart before checking out
              </p>
              <Link href="/products">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-2xl text-center"
            >
              <Card className="border-border/40 p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <svg
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </motion.div>
                <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
                <p className="mb-6 text-muted-foreground">
                  Thank you for your purchase. You'll receive an email
                  confirmation shortly.
                </p>
                <div className="flex gap-4">
                  <Link href="/products" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full bg-transparent"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button size="lg" className="w-full">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Checkout
            </h1>
            <p className="mt-2 text-muted-foreground">
              Complete your order securely
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckoutForm
              cartTotal={total}
              cartItems={cart}
              userId={user?.id || ""}
              userName={user?.name || ""}
              userEmail={user?.email || ""}
              onSuccess={(orderId) => {
                setShowSuccess(true);
              }}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
