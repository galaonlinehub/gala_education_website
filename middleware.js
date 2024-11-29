// import { NextResponse } from "next/server";
// import { api } from "@/src/config/settings";
// import { decrypt } from "./src/utils/constants/encryption";

// const AUTH_CONFIG = {
//   PUBLIC_ROUTES: ["/", "/signin", "/signup"],
//   REDIRECT_ROUTES: {
//     afterLogin: {
//       student: "/student",
//       instructor: "/teacher",
//       admin: "/admin",
//       parent: "/parent",
//     },
//     notAuthenticated: "/signin",
//   },
// };

// export async function middleware(request) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath = AUTH_CONFIG.PUBLIC_ROUTES.includes(path);

//   // Prevent redirect loops: Skip if already at the destination
//   if (Object.values(AUTH_CONFIG.REDIRECT_ROUTES.afterLogin).includes(path)) {
//     return NextResponse.next();
//   }

//   // Get and decrypt token from cookie
//   const cookieToken = request.cookies.get(
//     "9fb96164-a058-41e4-9456-1c2bbdbfbf8d"
//   )?.value;

//   const token = cookieToken ? decrypt(cookieToken) : null;

//   // Public route without token - always allow
//   if (isPublicPath && !token) {
//     return NextResponse.next();
//   }

//   // If token exists, validate it and redirect accordingly
//   if (isPublicPath && token) {
//     try {
//       const response = await api.get("/user", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // If token is valid, redirect based on role
//       if (response.status === 200) {
//         const redirectTo =
//           AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[response.data.role] ||
//           AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated;

//         console.log(redirectTo, "THIS IS REDIRECT");
//         return NextResponse.redirect(new URL(redirectTo, request.url));
//       } else {
//         return NextResponse.redirect(
//           new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
//         );
//       }
//     } catch (error) {
//       console.error("API validation error:", error.message);
//       return NextResponse.redirect(
//         new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
//       );
//     }
//   }

//   // Protected route without token - redirect to login
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(
//       new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
//     );
//   }

//   // If token exists, validate it and allow the request if valid
//   try {
//     const response = await api.get("/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // If token is valid, allow the request
//     if (response.status === 200) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
//       );
//     }
//   } catch (error) {
//     console.error("API validation error:", error.message);
//     return NextResponse.redirect(
//       new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
//     );
//   }
// }

// // Matcher for public routes and protected routes
// export const config = {
//   matcher: [
//     "/", // Public route
//     "/signin", // Public route
//     "/signup", // Public route
//     "/teacher/:path*", // Protected route
//     "/student/:path*", // Protected route
//     "/admin/:path*", // Protected route
//     "/parent/:path*", // Protected route
//   ],
// };


import { NextResponse } from "next/server";
import { api } from "@/src/config/settings";
import { decrypt } from "./src/utils/constants/encryption";

const AUTH_CONFIG = {
  PUBLIC_ROUTES: ["/", "/signin", "/signup"],
  REDIRECT_ROUTES: {
    afterLogin: {
      student: "/student",
      instructor: "/teacher",
      admin: "/admin",
      parent: "/parent",
    },
    notAuthenticated: "/signin",
  },
};

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = AUTH_CONFIG.PUBLIC_ROUTES.includes(path);

  // if (Object.values(AUTH_CONFIG.REDIRECT_ROUTES.afterLogin).includes(path)) {
  //   return NextResponse.next();
  // }

  const cookieToken = request.cookies.get(
    "9fb96164-a058-41e4-9456-1c2bbdbfbf8d"
  )?.value;
  const token = cookieToken ? decrypt(cookieToken) : null;

  if (isPublicPath) {
    if (!token) return NextResponse.next();

    try {
      // const response = await api.get("/user", {
        // headers: { Authorization: `Bearer ${token}` },
      // });

      // if (response.status === 200) {
        // const redirectTo = AUTH_CONFIG.REDIRECT_ROUTES.afterLogin[response.data.role] || "/signin";
        return NextResponse.next();

        // return NextResponse.redirect(new URL(redirectTo, request.url));
      // }
    } catch (error) {
      return NextResponse.redirect(new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url));
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url));
  }

  try {
    const response = await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status !== 200) {
      return NextResponse.redirect(new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/teacher/:path*",
    "/student/:path*",
    "/admin/:path*",
    "/parent/:path*",
  ],
};


