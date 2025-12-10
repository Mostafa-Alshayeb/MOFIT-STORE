import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }

    const db = await connectToDatabase();
    const favoritesCollection = db.collection("favorites");

    const favorites = await favoritesCollection
      .find({ userId })
      .project({ productId: 1 })
      .toArray();

    const favoriteIds = favorites.map((fav: any) => fav.productId);

    return NextResponse.json({ favorites: favoriteIds });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}
