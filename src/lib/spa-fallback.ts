export const spaFallbackHref = "/" as const;

/**
 * Paths Next/Vercel serve as files, not as App Router pages.
 * The catch-all only runs after these, so they never 308 to `/`.
 */
export function isFrameworkOrPublicAsset(pathname: string): boolean {
  const path = stripQuery(pathname);
  if (path === "/_next" || path.startsWith("/_next/")) {
    return true;
  }
  if (path === "/static" || path.startsWith("/static/")) {
    return true;
  }
  const lastSlash = path.lastIndexOf("/");
  const lastDot = path.lastIndexOf(".");
  return lastDot > lastSlash;
}

export function isUnknownPagePath(pathname: string): boolean {
  const path = stripQuery(pathname);
  if (path === "" || path === "/") {
    return false;
  }
  return !isFrameworkOrPublicAsset(path);
}

function stripQuery(pathname: string): string {
  const queryAt = pathname.indexOf("?");
  return queryAt === -1 ? pathname : pathname.slice(0, queryAt);
}
