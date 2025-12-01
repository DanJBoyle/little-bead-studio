import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const MAINTENANCE = import.meta.env.MAINTENANCE_MODE === "on";
  const pathname = context.url.pathname;

  // If not in maintenance mode → allow everything except maintenance page
  if (!MAINTENANCE) {
    if (pathname === "/maintenance") {
      return Response.redirect(new URL("/", context.url), 302);
    }
    return next();
  }

  // Allow maintenance and 404 routes directly
  if (pathname === "/maintenance" || pathname === "/404") {
    return next();
  }

  // Run the normal handler FIRST to detect status
  const response = await next();

  // If the route 404s - DO NOT redirect
  if (response.status === 404) {
    return response; // show the real 404 page
  }

  // Otherwise - redirect everything else to maintenance
  return Response.redirect(new URL("/maintenance", context.url), 302);
});
