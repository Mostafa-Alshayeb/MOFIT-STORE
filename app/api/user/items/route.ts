// // import { type NextRequest, NextResponse } from "next/server";
// // import { connectToDatabase } from "@/lib/mongodb";
// // import { verifyJWT } from "@/lib/auth-utils";

// // export async function GET(request: NextRequest) {
// //   try {
// //     console.log("[v0] GET /api/user/items called");
// //     const token = request.cookies.get("token");

// //     console.log("[v0] Token found:", !!token);

// //     if (!token) {
// //       console.log("[v0] No token, returning 401");
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     console.log("[v0] Verifying token...");
// //     const payload = verifyJWT(token.value);
// //     console.log("[v0] Token verified:", !!payload);

// //     if (!payload) {
// //       console.log("[v0] Invalid token, returning 401");
// //       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
// //     }

// //     console.log("[v0] User email:", payload.email);
// //     const db = await connectToDatabase();
// //     const usersCollection = db.collection("users");

// //     const user = await usersCollection.findOne({ email: payload.email });

// //     if (!user) {
// //       console.log("[v0] User not found");
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //     console.log(
// //       "[v0] User found, cart items:",
// //       user.cart?.length || 0,
// //       "favorites:",
// //       user.favorites?.length || 0
// //     );

// //     return NextResponse.json({
// //       cart: user.cart || [],
// //       favorites: user.favorites || [],
// //     });
// //   } catch (error) {
// //     console.error("[v0] Error fetching user items:", error);
// //     return NextResponse.json(
// //       { error: "Internal server error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { verifyJWT } from "@/lib/auth-utils";
// import { connectToDatabase } from "@/lib/mongodb";
// import Favorite from "@/models/favorites";
// import { User } from "@/models/user";

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ cart: [], favorites: [] });
//     }

//     const payload = verifyJWT(token);
//     if (!payload) {
//       return NextResponse.json({ cart: [], favorites: [] });
//     }

//     const user = await User.findOne({ email: payload.email });
//     if (!user) {
//       return NextResponse.json({ cart: [], favorites: [] });
//     }

//     const favoritesDocs = await Favorite.find({
//       userId: user._id.toString(),
//     }).select("productId");

//     return NextResponse.json({
//       cart: user.cart ?? [],
//       favorites: favoritesDocs.map((f) => f.productId),
//     });
//   } catch (err) {
//     console.error("user/items error:", err);
//     return NextResponse.json({ cart: [], favorites: [] }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { verifyJWT } from "@/lib/auth-utils";
// import { connectToDatabase } from "@/lib/mongodb";
// import Favorite from "@/models/favorites";
// import { CartItem } from "@/models/cartItem";

// export async function GET() {
//   await connectToDatabase();

//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ cart: [], favorites: [] });
//   }

//   const user = verifyJWT(token);
//   const cart = await CartItem.find({ userId: user?.id });
//   const favorites = await Favorite.find({ userId: user?.id }).select(
//     "productId -_id"
//   );

//   return NextResponse.json({
//     cart: [],
//     favorites: favorites.map((f) => f.productId),
//   });
// }

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromSession } from "@/lib/auth-utils";
import Favorite from "@/models/favorites";
import { CartItem } from "@/models/cartItem";

export async function GET() {
  await connectToDatabase();

  const user = await getUserFromSession();
  if (!user) {
    return NextResponse.json({ cart: [], favorites: [] });
  }

  const cart = await CartItem.find({ userId: user.id });
  const favorites = await Favorite.find({ userId: user.id }).select(
    "productId"
  );

  return NextResponse.json({
    cart,
    favorites: favorites.map((f) => f.productId),
  });
}
