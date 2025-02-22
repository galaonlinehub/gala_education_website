import { NextResponse } from "next/server";
import { apiGet } from "./src/services/api_service";
import { USER_COOKIE_KEY } from "./src/config/settings";
import { decrypt } from "./src/utils/fns/encryption";
import { roleRedirects } from "@/src/utils/data/redirect";

const AUTH_CONFIG = {
  PUBLIC_ROUTES: ["/", "/signin", "/signup"],
  REDIRECT_ROUTES: {
    afterLogin: roleRedirects,
    notAuthenticated: "/signin",
  },
  ROLE_PREFIXES: Object.fromEntries(
    Object.entries(roleRedirects).map(([role, path]) => [role, `${path}/`])
  ),
};

const safeRedirect = (url, request) => {
  try {
    return NextResponse.redirect(new URL(url, request.url));
  } catch (e) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
};

export async function middleware(request) {
  try {
    const path = request.nextUrl.pathname;

    if (AUTH_CONFIG.PUBLIC_ROUTES.includes(path)) {
      return NextResponse.next();
    }

    let token = null;
    try {
      const cookieToken = request.cookies.get(USER_COOKIE_KEY)?.value;
      if (!cookieToken) throw new Error("No cookie token found");
      token = decrypt(cookieToken);
      if (!token) throw new Error("Invalid token after decryption");
    } catch (error) {
      return safeRedirect(
        AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated,
        request
      );
    }

    try {
      const response = await apiGet("/user", {}, token);
      const user = response?.data;

      if (!user?.role || !AUTH_CONFIG.ROLE_PREFIXES[user.role]) {
        return safeRedirect(
          AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated,
          request
        );
      }

      const allowedPrefix = AUTH_CONFIG.ROLE_PREFIXES[user.role];
      const basePath = AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role];

      if (path !== basePath && !path.startsWith(allowedPrefix)) {
        return safeRedirect(
          AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role],
          request
        );
      }

      return NextResponse.next();
    } catch (error) {
      return safeRedirect(
        AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated,
        request
      );
    }
  } catch (error) {
    return safeRedirect(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request);
  }
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/instructor/:path*",
    "/student/:path*",
    "/admin/:path*",
    "/parent/:path*",
  ],
};
