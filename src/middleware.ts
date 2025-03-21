import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Add more detailed logging to help debug
  console.log(
    `[MIDDLEWARE] Path: ${request.nextUrl.pathname}, Token exists: ${!!token}`
  );

  // Check for API response redirects (for handling 401 responses from the API)
  const response = NextResponse.next();

  // Protect dashboard routes - this should be the first check
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log(
        `[MIDDLEWARE] No token found for dashboard route: ${request.nextUrl.pathname}, redirecting to login`
      );
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    console.log(
      `[MIDDLEWARE] Token found for dashboard route: ${request.nextUrl.pathname}, allowing access`
    );
  }

  // Redirect authenticated users from home page to dashboard
  if (request.nextUrl.pathname === "/") {
    if (token) {
      console.log(
        `[MIDDLEWARE] Token found on homepage, redirecting to dashboard`
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (
    request.nextUrl.pathname.startsWith("/auth/") ||
    request.nextUrl.pathname.startsWith("/reset-password/")
  ) {
    if (token && !request.nextUrl.pathname.startsWith("/auth/verify")) {
      console.log(
        `[MIDDLEWARE] Token found on auth page, redirecting to dashboard`
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  console.log(`[MIDDLEWARE] Allowing access to: ${request.nextUrl.pathname}`);
  return response;
}

// Add a response function to handle API responses
export function handleApiResponse(response: Response) {
  if (response.status === 401) {
    // Clear the token cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect to login
    window.location.href = "/auth/login";
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
