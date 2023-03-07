export type URL = {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  searchParams: { [key: string]: string[] };
  username: string;
};
export type ParseURL = (url: string) => URL;
export type urlParams = { [key: string]: string[] };
