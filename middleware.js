import { NextResponse } from "next/server";
import { decrypt } from "./src/utils/fns/encryption";
import { apiGet } from "./src/services/api_service";

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
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
    );
  }

  try {
    const response = await apiGet("/user", {
      Authorization: `Bearer ${token}`,
    });
    if (response.status === 200) {
      return NextResponse.redirect(
        new URL(AUTH_CONFIG.REDIRECT_ROUTES.afterLogin.response['role'], request.url)
      );
    }
  } catch (error) {
    // return NextResponse.redirect(
    //   new URL(AUTH_CONFIG.REDIRECT_ROUTES.notAuthenticated, request.url)
    // );
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
