import { NextResponse } from "next/server";
import   { NextRequest } from "next/server";

export function middleware(req  ) {
    const token = req.cookies.get("token")?.value || req.headers.get("authorization");

    if (!token) {
        const from = encodeURIComponent(req.nextUrl.pathname);
        return NextResponse.redirect(new URL(`/login?from=${from}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/ipm/:path*"], // 保护 /ipm
};
