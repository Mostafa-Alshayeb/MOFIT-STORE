// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { CartItem } from "@/models/cartItem";
// import { verifyJWT } from "@/lib/auth-utils";

// // Helper to get userId
// async function getUserId(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (token) {
//     const payload = verifyJWT(token);
//     if (payload?.id) return payload.id;
//   }
//   // Guest user fallback
//   let guestId = req.cookies.get("guestId")?.value;
//   if (!guestId) {
//     guestId = crypto.randomUUID();
//   }
//   return guestId;
// }

// // POST /api/cart → إضافة عنصر للكارت
// export async function POST(req: NextRequest) {
//   try {
//     await connectToDatabase();

//     const userId = await getUserId(req);

//     const body = await req.json();
//     const {
//       productId,
//       quantity,
//       selectedSize,
//       price,
//       description,
//       brand,
//       sizes,
//     } = body;

//     if (!productId || !quantity || selectedSize == null) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     // تحقق إذا العنصر موجود مسبقًا
//     const existingItem = await CartItem.findOne({
//       userId,
//       productId,
//       selectedSize,
//     });
//     if (existingItem) {
//       existingItem.quantity += quantity;
//       await existingItem.save();
//       return NextResponse.json({ cart: [existingItem] });
//     }

//     const newItem = await CartItem.create({
//       userId,
//       productId,
//       quantity,
//       selectedSize,
//       price,
//       description,
//       brand,
//       sizes,
//     });

//     const response = NextResponse.json({ cart: [newItem] });

//     // حفظ guestId في الكوكيز إذا كان ضيف
//     if (!req.cookies.get("token")) {
//       response.cookies.set("guestId", userId, {
//         path: "/",
//         maxAge: 7 * 24 * 60 * 60, // 7 أيام
//       });
//     }

//     return response;
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to add to cart" },
//       { status: 500 }
//     );
//   }
// }

// // PATCH /api/cart → تحديث كمية عنصر
// export async function PATCH(req: NextRequest) {
//   try {
//     await connectToDatabase();
//     const userId = await getUserId(req);
//     const body = await req.json();
//     const { productId, selectedSize, quantity } = body;

//     if (!productId || !selectedSize || quantity == null) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const item = await CartItem.findOne({ userId, productId, selectedSize });
//     if (!item)
//       return NextResponse.json({ error: "Item not found" }, { status: 404 });

//     item.quantity = quantity;
//     await item.save();

//     return NextResponse.json({ cart: [item] });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to update cart item" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/cart → حذف عنصر أو كل الكارت
// export async function DELETE(req: NextRequest) {
//   try {
//     await connectToDatabase();
//     const userId = await getUserId(req);
//     const body = await req.json();

//     if (body.productId && body.selectedSize != null) {
//       // حذف عنصر محدد
//       await CartItem.deleteOne({
//         userId,
//         productId: body.productId,
//         selectedSize: body.selectedSize,
//       });
//     } else {
//       // حذف كل الكارت
//       await CartItem.deleteMany({ userId });
//     }

//     return NextResponse.json({ message: "Cart updated" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to delete cart item" },
//       { status: 500 }
//     );
//   }
// }
