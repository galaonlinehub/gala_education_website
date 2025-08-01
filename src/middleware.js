import createMiddleware from "next-intl/middleware";

import { routing } from "@/src/i18n/routing";

export default createMiddleware(routing);

console.log("Middleware loaded with routing configuration");
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
