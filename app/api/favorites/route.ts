import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromSession, verifyJWT } from "@/lib/auth-utils";
import { connectToDatabase } from "@/lib/mongodb";
import Favorite from "@/models/favorites";

export async function GET() {
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ favorites: [] });
    }

    const user = verifyJWT(token);
    if (!user) {
      return NextResponse.json({ favorites: [] });
    }

    const favoritesDocs = await Favorite.find({
      userId: user.id,
    }).lean();

    return NextResponse.json({
      favorites: favoritesDocs.map((f) => f.productId),
    });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const exists = await Favorite.findOne({
      userId: user.id,
      productId,
    });

    if (exists) {
      return NextResponse.json(
        { message: "Already in favorites" },
        { status: 200 }
      );
    }

    await Favorite.create({
      userId: user.id,
      productId,
    });

    return NextResponse.json(
      { message: "Added to favorites" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Favorites error:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = verifyJWT(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await Favorite.findOneAndDelete({
      userId: user.id,
      productId,
    });

    return NextResponse.json(
      { message: "Removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Favorites DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}
