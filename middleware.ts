import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export default async function middleware(req: NextRequest) {
	const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value;
	
	if(req.nextUrl.pathname === "/log-in") return;

	if(session){
		const authResponse = await fetch("https://strustore.vercel.app/api/auth", {
      headers: {
        Cookie: `session=${session}`,
      },
    });

    // If not authorized return home
		if (authResponse.status !== 200){
			return NextResponse.redirect(new URL("/log-in", req.url));
		}

		return;
	} else {
		return NextResponse.redirect(new URL("/log-in", req.url));
	}
}


export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
}
