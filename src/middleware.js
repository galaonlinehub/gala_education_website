// import createMiddleware from "next-intl/middleware";

// export default createMiddleware(routing);

// console.log("Middleware loaded with routing configuration");
// export const config = {
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };

import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { USER_COOKIE_KEY } from "@/config/settings";
import { apiGet } from "@/services/api/api_service";
import { routing } from "@/src/i18n/routing";
import { roleRedirects, TRIAL_ALLOWED_PATHS } from "@/utils/data/redirect";
import { decrypt } from "@/utils/fns/encryption";

const intlMiddleware = createMiddleware(routing);

const AUTH_CONFIG = {
  PUBLIC_ROUTES: [
    "/",
    "/signin",
    "/signup",
    "/about-us",
    "/forgot-password",
    "/forgot-password/password-change",
    "/activate-account",

  ],
  AUTH_ONLY_ROUTES: ["/signin", "/signup"],
  NON_ROLE_ROUTES: ["/gala-meet"],
  REDIRECT_ROUTES: {
    afterLogin: roleRedirects,
    notAuthenticated: "/signin",
  },
  ROLE_PREFIXES: Object.fromEntries(
    Object.entries(roleRedirects).map(([role, path]) => [role, `${path}/`])
  ),
};

const safeRedirect = (url, request, locale) => {

  try {
    const redirectUrl = locale ? `/${locale}${url}` : url;
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (e) {
    const fallbackUrl = locale ? `/${locale}/signin` : "/signin";
    return NextResponse.redirect(new URL(fallbackUrl, request.url));
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

const getLocaleFromPath = (pathname) => {
  const segments = pathname.split("/");
  const possibleLocale = segments[1];
  return routing.locales.includes(possibleLocale)
    ? possibleLocale
    : routing.defaultLocale;
};

const getPathWithoutLocale = (pathname) => {
  const segments = pathname.split("/");
  const possibleLocale = segments[1];
  if (routing.locales.includes(possibleLocale)) {
    return "/" + segments.slice(2).join("/") || "/";
  }
  return pathname;
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

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;
    const locale = getLocaleFromPath(pathname);
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const intlResponse = intlMiddleware(request);

    if (intlResponse.status === 307 || intlResponse.status === 302) {
      return intlResponse;
    }

    if (AUTH_CONFIG.PUBLIC_ROUTES.includes(pathWithoutLocale)) {
      if (AUTH_CONFIG.AUTH_ONLY_ROUTES.includes(pathWithoutLocale)) {
        const user = await getAuthenticatedUser(request);
        const userRole = user?.role;

        if (userRole && AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[userRole]) {
          return safeRedirect(
            AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[userRole],
            request,
            locale
          );
        }
      }

      return intlResponse;
    }

    const user = await getAuthenticatedUser(request);
    if (!user?.role || !AUTH_CONFIG.ROLE_PREFIXES[user.role]) {
      return safeRedirect(
        AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated,
        request,
        locale
      );
    }

    if (user?.has_free_trial === true) {
      const allowedTrialPaths = TRIAL_ALLOWED_PATHS(user?.role);
      const isAllowed = allowedTrialPaths.some((p) => pathWithoutLocale === p);

      if (!isAllowed) {
        return NextResponse.rewrite(
          new URL(`/${locale}/not-found`, request.url)
        );
      }
    }

    if (AUTH_CONFIG.NON_ROLE_ROUTES.includes(pathWithoutLocale)) {
      return NextResponse.next();

    }

    const allowedPrefix = AUTH_CONFIG.ROLE_PREFIXES[user.role];
    const basePath = AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role];

    if (
      pathWithoutLocale !== basePath &&
      !pathWithoutLocale.startsWith(allowedPrefix)
    ) {
      return safeRedirect(
        AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role],
        request,
        locale
      );
    }



    return intlResponse;
  } catch (error) {
    const locale = getLocaleFromPath(request.nextUrl.pathname);
    return safeRedirect(
      AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated,
      request,
      locale
    );
  }
}

export const config = {
  matcher: [
    "/",

    "/((?!_next|api|favicon.ico|.*\\.).*)",

    // Explicitly handle your localized routes
    "/(en|sw)/:path*",
  ],
};
