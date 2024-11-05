import { customInitApp } from "@/lib/firebase/admin-config";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

customInitApp() // Important otherwise you will receive no-app error

export async function GET() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get("session")?.value;

	if (!sessionValue) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

	const decodedClaims = await auth().verifySessionCookie(
    sessionValue,
    true
  );
  await auth().revokeRefreshTokens(decodedClaims.uid);
  cookieStore.delete("session");

	return NextResponse.json({ success: true }, { status: 200 });
}