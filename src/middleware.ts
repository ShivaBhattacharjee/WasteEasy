import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ["/login", "/register", "/verify-register", "/forgot-password", "/verify-forget-password"].includes(path);
    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/login", "/register", "/profile", "/edit-profile", "/verify-register", "/forgot-password", "/verify-forget-password"],
};
