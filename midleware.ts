// middleware.ts
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (req.nextUrl.pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
