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
      let retryCount = 0;
      const maxRetries = 2;
      let response;

      while (retryCount < maxRetries) {
        try {
          response = await Promise.race([
            apiGet("/user", {}, token),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timeout")), 5000)
            ),
          ]);

          if (response?.data) {
            break; 
          }
          throw new Error("Invalid response");
        } catch (error) {
          retryCount++;
          const isLastRetry = retryCount === maxRetries;

          if (isNetworkError(error)) {
            if (isLastRetry) {
              return NextResponse.next();
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
          } else {
            throw error;
          }
        }
      }

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



// import { NextResponse } from "next/server";
// import { apiGet } from "./src/services/api_service";
// import { USER_COOKIE_KEY } from "./src/config/settings";
// import { decrypt } from "./src/utils/fns/encryption";
// import { roleRedirects } from "@/src/utils/data/redirect";

// const AUTH_CONFIG = {
//   PUBLIC_ROUTES: ["/", "/signin", "/signup"],
//   REDIRECT_ROUTES: {
//     afterLogin: roleRedirects,
//     notAuthenticated: "/signin",
//   },
//   ROLE_PREFIXES: Object.fromEntries(
//     Object.entries(roleRedirects).map(([role, path]) => [role, `${path}/`])
//   ),
// };

// const safeRedirect = (url, request) => {
//   try {
//     return NextResponse.redirect(new URL(url, request.url));
//   } catch (e) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }
// };

// const isNetworkError = (error) => {
//   const networkErrorMessages = [
//     "Request timeout",
//     "Network Error",
//     "Failed to fetch",
//     "Connection refused",
//   ];
//   const message = error.message?.toLowerCase() || "";
//   return (
//     networkErrorMessages.some((msg) => message.includes(msg.toLowerCase())) ||
//     (error.status && error.status >= 500) ||
//     error.code === "ECONNRESET" ||
//     error.code === "ENOTFOUND"
//   );
// };

// const getUserFromCookie = async (request) => {
//   try {
//     const cookieToken = request.cookies.get(USER_COOKIE_KEY)?.value;
//     if (!cookieToken) return null;

//     const token = decrypt(cookieToken);
//     if (!token) return null;

//     let retryCount = 0;
//     const maxRetries = 2;
//     let response;

//     while (retryCount < maxRetries) {
//       try {
//         response = await Promise.race([
//           apiGet("/user", {}, token),
//           new Promise((_, reject) =>
//             setTimeout(() => reject(new Error("Request timeout")), 5000)
//           ),
//         ]);
//         if (response?.data) return response.data;

//         throw new Error("Invalid response");
//       } catch (error) {
//         retryCount++;
//         const isLastRetry = retryCount === maxRetries;

//         if (isNetworkError(error)) {
//           if (isLastRetry) return null;
//           await new Promise(resolve => setTimeout(resolve, 1000));
//         } else {
//           return null;
//         }
//       }
//     }
//   } catch (err) {
//     return null;
//   }
// };

// export async function middleware(request) {
//   const path = request.nextUrl.pathname;

//   if (AUTH_CONFIG.PUBLIC_ROUTES.includes(path)) {
//     const user = await getUserFromCookie(request);
//     if (user?.role && AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role]) {
//       if (path === "/signin") {
//         return safeRedirect(AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role], request);
//       }
//     }
//     return NextResponse.next();
//   }

//   const user = await getUserFromCookie(request);
//   if (!user || !user.role || !AUTH_CONFIG.ROLE_PREFIXES[user.role]) {
//     return safeRedirect(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request);
//   }

//   const allowedPrefix = AUTH_CONFIG.ROLE_PREFIXES[user.role];
//   const basePath = AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[user.role];

//   if (path !== basePath && !path.startsWith(allowedPrefix)) {
//     return safeRedirect(basePath, request);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/signin",
//     "/signup",
//     "/instructor/:path*",
//     "/student/:path*",
//     "/admin/:path*",
//     "/parent/:path*",
//   ],
// };
