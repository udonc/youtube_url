import { parseURL } from "../url/mod.ts";

export function isYouTubeURL(url: string): boolean {
  if (!url) {
    throw new Error("url is required");
  }

  const youTubeHostNames = [
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "www.youtube-nocookie.com",
    "youtu.be",
  ];

  const parsedURL = parseURL(url);

  return youTubeHostNames.includes(parsedURL.hostname);
}
