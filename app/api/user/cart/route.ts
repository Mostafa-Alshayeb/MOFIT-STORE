import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyJWT } from "@/lib/auth-utils";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user) {
      return NextResponse.json({ cart: [] }, { status: 200 });
    }

    return NextResponse.json({ cart: user.cart || [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ cart: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart } = await request.json();

    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    await usersCollection.updateOne(
      { _id: new ObjectId(decoded.id) },
      { $set: { cart: cart || [] } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}
