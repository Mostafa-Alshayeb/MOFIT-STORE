// import { type NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { verifyJWT } from "@/lib/auth-utils";

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = request.cookies.get("token");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const payload = verifyJWT(token.value);
//     if (!payload) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const { id } = params;
//     const db = await connectToDatabase();
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ email: payload.email });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const cart = (user.cart || []).filter((c: any) => c._id !== id);

//     await usersCollection.updateOne(
//       { email: payload.email },
//       { $set: { cart } }
//     );

//     return NextResponse.json({ success: true, cart });
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = request.cookies.get("token");

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const payload = verifyJWT(token.value);
//     if (!payload) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const { id } = params;
//     const { quantity } = await request.json();
//     const db = await connectToDatabase();
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ email: payload.email });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const cart = (user.cart || []).map((c: any) =>
//       c._id === id ? { ...c, quantity } : c
//     );

//     await usersCollection.updateOne(
//       { email: payload.email },
//       { $set: { cart } }
//     );

//     return NextResponse.json({ success: true, cart });
//   } catch (error) {
//     console.error("Error updating cart item:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
