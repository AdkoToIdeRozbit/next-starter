import { customInitApp } from "@/lib/firebase/admin-config";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

customInitApp() // Important otherwise you will receive no-app error

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  try{
    await auth().verifySessionCookie(session, true)
    return NextResponse.json({}, { status: 200 });

  } catch(err){
    console.error(err)
    return NextResponse.json({}, { status: 401 });
  }
}


export async function POST(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  const cookieStore = await cookies()

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      //Generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });

      //Add the cookie to the browser
      cookieStore.set({
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        path: "/"
      });
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({}, { status: 401 });
}
