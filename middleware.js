import { NextResponse } from "next/server";

import { USER_COOKIE_KEY } from "@/config/settings";
import { apiGet } from "@/services/api/api_service";
import { roleRedirects, TRIAL_ALLOWED_PATHS } from "@/utils/data/redirect";
import { decrypt } from "@/utils/fns/encryption";

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

const isNetworkError = (error) => {
  const networkErrorMessages = [
    "Request timeout",
    "Network Error",
    "Failed to fetch",
    "Connection refused",
  ];
  const message = error.message?.toLowerCase() || "";
  return (
    networkErrorMessages.some((msg) => message.includes(msg.toLowerCase())) ||
    (error.status && error.status >= 500) ||
    error.code === "ECONNRESET" ||
    error.code === "ENOTFOUND"
  );
};

export async function middleware(request) {
  try {
    const path = request.nextUrl.pathname;

    if (AUTH_CONFIG.PUBLIC_ROUTES.includes(path)) {
      const user = await getAuthenticatedUser(request);
      const userRole = user?.role;

      if (userRole && AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[userRole]) {
        return safeRedirect(
          AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[userRole],
          request
        );
      }

      return NextResponse.next();
    }

    const user = await getAuthenticatedUser(request);
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

    if (user?.has_free_trial === true) {
      const allowedTrialPaths = TRIAL_ALLOWED_PATHS(user?.role);
      const isAllowed = allowedTrialPaths.some((p) => path === p);

      if (!isAllowed) {
        return NextResponse.rewrite(new URL("/not-found", request.url));
      }
    }

    return NextResponse.next();
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

async function getAuthenticatedUser(request, maxRetries = 2) {
  const cookieToken = request.cookies.get(USER_COOKIE_KEY)?.value;
  if (!cookieToken) return null;

  const token = decrypt(cookieToken);
  if (!token) return null;

  let retryCount = 0;
  while (retryCount < maxRetries) {
    try {
      const response = await Promise.race([
        apiGet("/auth-user", {}, token),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 5000)
        ),
      ]);
      return response?.data?.data || null;
    } catch (error) {
      retryCount++;
      const isLastRetry = retryCount === maxRetries;

      if (isNetworkError(error)) {
        if (isLastRetry) return null;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        return null;
      }
    }
  }

  return null;
}
