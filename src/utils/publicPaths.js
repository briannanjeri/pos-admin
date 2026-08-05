// src/utils/publicPaths.js
export const PUBLIC_PATHS = ["/login", "/activate-account", "/setup-account", "/pos-login"];
export const isPublicPath = (pathname) =>
  PUBLIC_PATHS.some((p) => pathname.startsWith(p));