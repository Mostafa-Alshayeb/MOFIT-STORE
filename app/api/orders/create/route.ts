import { type NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { order, cartItems } = await request.json();

    // Validate required fields
    if (!order.shippingAddress || !order.paymentDetails) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate card number (simple validation)
    const cardNumber = order.paymentDetails.cardNumber.replace(/\s/g, "");
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      return NextResponse.json(
        { error: "Invalid card number" },
        { status: 400 }
      );
    }

    // For demo, we accept the specific test card number
    const acceptedCard = "4244540043113763";
    if (cardNumber !== acceptedCard) {
      return NextResponse.json(
        { error: "Card not accepted. Please use a valid test card." },
        { status: 400 }
      );
    }

    // Connect to MongoDB to save order
    const db = await connect();
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const ordersCollection = db.collection("orders");
    const result = await ordersCollection.insertOne({
      ...order,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
