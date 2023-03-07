import type { URL, urlParams } from "../types/mod.ts";

export function parseURL(url: string): URL {
  const urlInstance = new URL(url);

  const keys = Array.from(new Set(Array.from(urlInstance.searchParams.keys())));
  const params: urlParams = {};
  keys.map((key) => {
    params[key] = urlInstance.searchParams.getAll(key);
    return params;
  });

  const parsedURL: URL = {
    href: urlInstance.href,
    origin: urlInstance.origin,
    protocol: urlInstance.protocol,
    username: urlInstance.username,
    password: urlInstance.password,
    host: urlInstance.host,
    hostname: urlInstance.hostname,
    port: urlInstance.port,
    pathname: urlInstance.pathname,
    hash: urlInstance.hash,
    search: urlInstance.search,
    searchParams: params,
  };

  return parsedURL;
}
