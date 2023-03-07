import {
  TimeInfo,
  YouTubeVideoURL,
  YouTubeVideoURLType,
} from "../types/youtube_url.ts";
import { parseURL } from "../url/mod.ts";

export function isValidYouTubeVideoId(videoId: string): boolean {
  const regexp = /^([a-zA-Z0-9-_]){11}$/;
  const isValid = regexp.test(videoId);
  return isValid;
}

export function getYouTubeVideoURLType(url: string): YouTubeVideoURLType {
  if (!url) {
    throw new Error("url is required");
  }

  const parsedURL = parseURL(url);
  const { hostname, pathname, searchParams } = parsedURL;
  const paths = pathname.split("/").filter(Boolean);

  if (hostname === "youtu.be" && paths[0] === "watch" && searchParams?.v?.[0]) {
    return "youtu.be/watch?v=[id]";
  }

  if (hostname === "youtu.be" && paths.length === 1 && paths[0] !== "watch") {
    return "youtu.be/[id]";
  }

  if (
    hostname === "youtube.com" || hostname === "www.youtube.com" ||
    hostname === "m.youtube.com"
  ) {
    if (paths[0] === "watch") {
      return "youtube.com/watch?v=[id]";
    }
    if (paths[0] === "v") {
      return "youtube.com/v/[id]";
    }
    if (paths[0] === "e") {
      return "youtube.com/e/[id]";
    }
    if (paths[0] === "embed") {
      return "youtube.com/embed/[id]";
    }
    if (paths[0] === "attribution_link") {
      return "youtube.com/attribution_link?u=/watch%3Fv%3D[id]";
    }
  }

  if (hostname === "youtube-nocookie.com" || paths[0] === "embed") {
    return "youtube-nocookie.com/embed/[id]";
  }

  throw new Error(`${url} is not a valid YouTube video URL`);
}

export function getYouTubeVideoId(url: string): string {
  if (!url) {
    throw new Error("url is required");
  }
  const urlType = getYouTubeVideoURLType(url);

  switch (urlType) {
    case "youtu.be/[id]":
      return parseURL(url).pathname.split("/").filter(Boolean)[0].split("&")[0];
    case "youtu.be/watch?v=[id]":
      return parseURL(url).searchParams.v[0];
    case "youtube.com/watch?v=[id]":
      return parseURL(url).searchParams.v[0];
    case "youtube.com/v/[id]":
      return parseURL(url).pathname.split("/").filter(Boolean)[1];
    case "youtube.com/e/[id]":
      return parseURL(url).pathname.split("/").filter(Boolean)[1];
    case "youtube.com/embed/[id]":
      return parseURL(url).pathname.split("/").filter(Boolean)[1];
    case "youtube-nocookie.com/embed/[id]":
      return parseURL(url).pathname.split("/").filter(Boolean)[1];
    case "youtube.com/attribution_link?u=/watch%3Fv%3D[id]":
      return (() => {
        const u = parseURL(url).searchParams.u[0];
        const decoded = decodeURIComponent(u);
        const newURL = "http://localhost" + decoded;
        return parseURL(newURL).searchParams.v[0];
      })();
    default:
      throw new Error("invalid url");
  }
}

export function isYouTubeVideoURL(url: string): boolean {
  if (!url) {
    throw new Error("url is required");
  }
  try {
    isValidYouTubeVideoId(getYouTubeVideoId(url));
    return true;
  } catch {
    return false;
  }
}

export function parseTimeQuery(query: string): TimeInfo {
  if (!query) {
    throw new Error("query is required");
  }
  const regexp = /^(([0-9].*)h)?(([0-9].*)m)?(([0-9].*)s)?/i;
  const match = query.match(regexp);
  const parsed = {
    h: parseInt(match?.[2] ?? "0"),
    m: parseInt(match?.[4] ?? "0"),
    s: parseInt(match?.[6] ?? "0"),
  };
  const seconds = parsed.h * 3600 + parsed.m * 60 + parsed.s;

  const reCalculated = {
    h: Math.floor(seconds / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: Math.floor(seconds % 60),
  };
  return {
    seconds: seconds,
    string: `${
      [
        reCalculated.h && reCalculated.h + "h",
        reCalculated.m && reCalculated.m + "m",
        reCalculated.s && reCalculated.s + "s",
      ].filter(Boolean).join("")
    }`,
  } as TimeInfo;
}

export function getTimeSeconds(url: string): number {
  if (!url) {
    throw new Error("url is required");
  }
  if (!isYouTubeVideoURL(url)) {
    throw new Error(`${url} is not a valid YouTube video URL`);
  }

  const timeQuery = parseURL(url).searchParams?.t?.[0];

  if (!timeQuery) {
    return 0;
  }

  return parseTimeQuery(timeQuery).seconds;
}

export function parseYouTubeVideoURL(url: string): YouTubeVideoURL {
  if (!url) {
    throw new Error("url is required");
  }

  if (!isYouTubeVideoURL(url)) {
    throw new Error("url is not a valid YouTube video URL");
  }

  const videoId = getYouTubeVideoId(url);

  if (!isValidYouTubeVideoId(videoId)) {
    throw new Error(`${videoId} is not a valid YouTube video ID`);
  }

  const timeSeconds = getTimeSeconds(url);

  return {
    videoId: videoId,
    startTime: timeSeconds === 0 ? undefined : timeSeconds,
  } as YouTubeVideoURL;
}
