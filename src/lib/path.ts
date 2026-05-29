const base = import.meta.env.BASE_URL;

export function withBase(path = "/") {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, "");

  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith(normalizedBase)) {
    return path;
  }

  return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
}
