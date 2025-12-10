"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { ShippingAddress, PaymentDetails, CartItem } from "@/lib/types";

interface CheckoutFormProps {
  cartTotal: number;
  cartItems: CartItem[];
  onSuccess: (orderId: string) => void;
  userId: string;
  userName: string;
  userEmail: string;
}

export function CheckoutForm({
  cartTotal,
  cartItems,
  onSuccess,
  userId,
  userName,
  userEmail,
}: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("shipping");

  const [shippingData, setShippingData] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: userEmail,
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [paymentData, setPaymentData] = useState<PaymentDetails>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const shippingCost = cartTotal >= 100 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + tax;

  const handleShippingChange = (
    field: keyof ShippingAddress,
    value: string
  ) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setPaymentData((prev) => ({ ...prev, [field]: formatted }));
    } else if (field === "expiryDate") {
      // Format expiry date MM/YY
      const formatted = value.replace(/\D/g, "").slice(0, 4);
      if (formatted.length >= 2) {
        const mm = formatted.slice(0, 2);
        const yy = formatted.slice(2, 4);
        setPaymentData((prev) => ({ ...prev, expiryDate: `${mm}/${yy}` }));
      } else {
        setPaymentData((prev) => ({ ...prev, expiryDate: formatted }));
      }
    } else if (field === "cvv") {
      setPaymentData((prev) => ({
        ...prev,
        cvv: value.replace(/\D/g, "").slice(0, 3),
      }));
    } else {
      setPaymentData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateShipping = () => {
    return (
      shippingData.firstName &&
      shippingData.lastName &&
      shippingData.email &&
      shippingData.phone &&
      shippingData.address &&
      shippingData.city &&
      shippingData.state &&
      shippingData.zipCode &&
      shippingData.country
    );
  };

  const validatePayment = () => {
    const cardNumber = paymentData.cardNumber.replace(/\s/g, "");
    return (
      paymentData.cardName &&
      cardNumber.length === 16 &&
      paymentData.expiryDate.length === 5 &&
      paymentData.cvv.length === 3
    );
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      // Validate both forms
      if (!validateShipping()) {
        setError("Please fill in all shipping details");
        setActiveTab("shipping");
        setLoading(false);
        return;
      }

      if (!validatePayment()) {
        setError("Please fill in all payment details correctly");
        setActiveTab("payment");
        setLoading(false);
        return;
      }

      // Create order
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: {
            userId,
            items: cartItems,
            total: finalTotal,
            status: "completed",
            shippingAddress: shippingData,
            paymentDetails: {
              cardName: paymentData.cardName,
              cardNumber: paymentData.cardNumber.slice(-4).padStart(16, "*"),
              expiryDate: paymentData.expiryDate,
              cvv: "***",
            },
          },
          cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Payment failed");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess(data.orderId);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl"
      >
        <Card className="border-border/40 bg-gradient-to-br from-background to-background/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold">
              Order Placed Successfully!
            </h2>
            <p className="text-muted-foreground">
              Redirecting to order confirmation...
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* Shipping Tab */}
        <TabsContent value="shipping" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>
                Where should we deliver your order?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="First Name"
                  value={shippingData.firstName}
                  onChange={(e) =>
                    handleShippingChange("firstName", e.target.value)
                  }
                  className="border-border/40"
                />
                <Input
                  placeholder="Last Name"
                  value={shippingData.lastName}
                  onChange={(e) =>
                    handleShippingChange("lastName", e.target.value)
                  }
                  className="border-border/40"
                />
              </div>

              <Input
                placeholder="Email"
                type="email"
                value={shippingData.email}
                onChange={(e) => handleShippingChange("email", e.target.value)}
                className="border-border/40"
              />

              <Input
                placeholder="Phone Number"
                value={shippingData.phone}
                onChange={(e) => handleShippingChange("phone", e.target.value)}
                className="border-border/40"
              />

              <Input
                placeholder="Street Address"
                value={shippingData.address}
                onChange={(e) =>
                  handleShippingChange("address", e.target.value)
                }
                className="border-border/40"
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <Input
                  placeholder="City"
                  value={shippingData.city}
                  onChange={(e) => handleShippingChange("city", e.target.value)}
                  className="border-border/40"
                />
                <Input
                  placeholder="State"
                  value={shippingData.state}
                  onChange={(e) =>
                    handleShippingChange("state", e.target.value)
                  }
                  className="border-border/40"
                />
                <Input
                  placeholder="Zip Code"
                  value={shippingData.zipCode}
                  onChange={(e) =>
                    handleShippingChange("zipCode", e.target.value)
                  }
                  className="border-border/40"
                />
              </div>

              <Input
                placeholder="Country"
                value={shippingData.country}
                onChange={(e) =>
                  handleShippingChange("country", e.target.value)
                }
                className="border-border/40"
              />

              <Button
                onClick={() => setActiveTab("payment")}
                disabled={!validateShipping()}
                size="lg"
                className="w-full"
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Payment Details
              </CardTitle>
              <CardDescription>
                Test Card: **** **** **** **** | Any future date | Any CVC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Cardholder Name"
                value={paymentData.cardName}
                onChange={(e) =>
                  handlePaymentChange("cardName", e.target.value)
                }
                className="border-border/40"
              />

              <Input
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  handlePaymentChange("cardNumber", e.target.value)
                }
                maxLength={19}
                className="border-border/40 font-mono"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) =>
                    handlePaymentChange("expiryDate", e.target.value)
                  }
                  className="border-border/40 font-mono"
                />
                <Input
                  placeholder="CVV"
                  type="password"
                  value={paymentData.cvv}
                  onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                  maxLength={3}
                  className="border-border/40 font-mono"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-red-500"
                >
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </motion.div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!validatePayment() || loading}
                size="lg"
                className="w-full"
              >
                {loading
                  ? "Processing..."
                  : `Complete Order - $${finalTotal.toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Summary */}
      <Card className="sticky bottom-0 border-border/40">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>
              {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-border/40 pt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
