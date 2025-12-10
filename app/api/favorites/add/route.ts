import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    console.log(" API favorites/add called");

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      console.log(" No userId cookie found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      console.log(" No productId provided");
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    console.log(" Connected to database:", typeof db);

    const favoritesCollection = db.collection("favorites");
    console.log(" Got collection:", typeof favoritesCollection);

    // Check if already favorited
    const existing = await favoritesCollection.findOne({ userId, productId });

    if (existing) {
      console.log(" Already favorited");
      return NextResponse.json(
        { message: "Already in favorites" },
        { status: 200 }
      );
    }

    await favoritesCollection.insertOne({
      userId,
      productId,
      createdAt: new Date(),
    });

    console.log(" Successfully added to favorites");
    return NextResponse.json(
      { message: "Added to favorites" },
      { status: 201 }
    );
  } catch (error) {
    console.error(" Error in favorites/add:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to add favorite: ${errorMessage}` },
      { status: 500 }
    );
  }
}
