import { type NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie) {
      console.log("not found token");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = verifyJWT(tokenCookie.value);

    if (!user) {
      console.log("not found user");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(
      { user: { name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
}
