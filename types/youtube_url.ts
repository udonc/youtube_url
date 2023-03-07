export type YouTubeURLType = "channel" | "video" | "playlist";

export type YouTubeVideoURLType =
  | "youtu.be/[id]"
  | "youtu.be/watch?v=[id]"
  | "youtube.com/watch?v=[id]"
  | "youtube.com/v/[id]"
  | "youtube.com/e/[id]"
  | "youtube.com/embed/[id]"
  | "youtube.com/attribution_link?u=/watch%3Fv%3D[id]"
  | "youtube-nocookie.com/embed/[id]";

export type YouTubeURLSubDomainType = "none" | "www" | "m";

export type TimeString =
  | `${number}h${number}m${number}s`
  | `${number}m${number}s`
  | `${number}s`;

export type TimeInfo = {
  seconds: number;
  string?: string;
};

export type YouTubeVideoURL = {
  videoId: string;
  startTime?: number;
  // playlistId?: string;
};
