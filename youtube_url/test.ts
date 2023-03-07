import { assert, assertEquals, assertThrows } from "../deps.ts";
import { youTubeURLs } from "../test/youtube_url.ts";
import {
  getYouTubeVideoId,
  getYouTubeVideoURLType,
  isValidYouTubeVideoId,
  isYouTubeURL,
  isYouTubeVideoURL,
  parseTimeQuery,
} from "./mod.ts";
import { parseYouTubeVideoURL } from "./video.ts";

Deno.test("[Function] isYouTubeURL", () => {
  for (const url of youTubeURLs) {
    assertEquals(
      isYouTubeURL(url),
      true,
      `💣 The url ${url} is not validated as a YouTube url`,
    );
  }
});

Deno.test("[Function] isValidYouTubeId", () => {
  assertEquals(
    isValidYouTubeVideoId("dQw4w9WgXcQ"),
    true,
  );
  assertEquals(
    isValidYouTubeVideoId("watch"),
    false,
  );
});

Deno.test("[Function] getYouTubeVideoURLType", () => {
  for (const url of youTubeURLs) {
    assert(() => {
      getYouTubeVideoURLType(url);
    }, `💣 url: ${url}`);
  }
  const wrongURLs = [
    "https://youtu.be/v/dQw4w9WgXcQ",
    "https://youtu.be/watch?video=dQw4w9WgXcQ",
  ];
  for (const url of wrongURLs) {
    assertThrows(() => {
      getYouTubeVideoURLType(url);
    }, `💣 url: ${url}`);
  }
});

Deno.test("[Function] getYouTubeVideoId", () => {
  for (const url of youTubeURLs) {
    assert(() => {
      getYouTubeVideoId(url);
    }, `💣 url: ${url}`);
  }

  const correctURLs = [
    // https://youtu.be
    // Standard
    "https://youtu.be/dQw4w9WgXcQ",
    "https://youtu.be/watch?v=dQw4w9WgXcQ",
    // With time (query)
    "https://youtu.be/dQw4w9WgXcQ?t=10s",
    // With time (wrong format but worked)
    "https://youtu.be/dQw4w9WgXcQ&t=10s",

    // http://youtu.be
    // Standard
    "http://youtu.be/dQw4w9WgXcQ",
    // With time (query)
    "http://youtu.be/dQw4w9WgXcQ?t=10s",
    // With time (wrong format but worked)
    "http://youtu.be/dQw4w9WgXcQ&t=10s",

    // https://www.youtube.com
    // Standard
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/v/dQw4w9WgXcQ",
    "https://www.youtube.com/e/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/attribution_link?u=/watch%3Fv%3DdQw4w9WgXcQ",
    // With time (query)
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
    "https://www.youtube.com/v/dQw4w9WgXcQ?t=10s",
    "https://www.youtube.com/e/dQw4w9WgXcQ?t=10s",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?t=10s",
    // With other query
    "https://www.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?feature=player_embed&v=dQw4w9WgXcQ&autohide=1",

    // http://www.youtube.com
    // Standard
    "http://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "http://www.youtube.com/v/dQw4w9WgXcQ",
    "http://www.youtube.com/e/dQw4w9WgXcQ",
    "http://www.youtube.com/embed/dQw4w9WgXcQ",
    "http://www.youtube.com/attribution_link?u=/watch%3Fv%3DdQw4w9WgXcQ",
    // With time (query)
    "http://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
    "http://www.youtube.com/v/dQw4w9WgXcQ?t=10s",
    "http://www.youtube.com/e/dQw4w9WgXcQ?t=10s",
    "http://www.youtube.com/embed/dQw4w9WgXcQ?t=10s",
    // With other query
    "http://www.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
    "http://www.youtube.com/watch?feature=player_embed&v=dQw4w9WgXcQ&autohide=1",

    // https://youtube.com
    // Standard
    "https://youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtube.com/v/dQw4w9WgXcQ",
    "https://youtube.com/e/dQw4w9WgXcQ",
    "https://youtube.com/embed/dQw4w9WgXcQ",
    "https://youtube.com/attribution_link?u=/watch%3Fv%3DdQw4w9WgXcQ",
    // With time (query)
    "https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
    "https://youtube.com/v/dQw4w9WgXcQ?t=10s",
    "https://youtube.com/e/dQw4w9WgXcQ?t=10s",
    "https://youtube.com/embed/dQw4w9WgXcQ?t=10s",
    // With other query
    "https://youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
    "https://youtube.com/watch?feature=player_embed&v=dQw4w9WgXcQ&autohide=1",

    // http://youtube.com
    // Standard
    "http://youtube.com/watch?v=dQw4w9WgXcQ",
    "http://youtube.com/v/dQw4w9WgXcQ",
    "http://youtube.com/e/dQw4w9WgXcQ",
    "http://youtube.com/embed/dQw4w9WgXcQ",
    "http://youtube.com/attribution_link?u=/watch%3Fv%3DdQw4w9WgXcQ",
    // With time (query)
    "http://youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
    "http://youtube.com/v/dQw4w9WgXcQ?t=10s",
    "http://youtube.com/e/dQw4w9WgXcQ?t=10s",
    "http://youtube.com/embed/dQw4w9WgXcQ?t=10s",
    // With other query
    "http://youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
    "http://youtube.com/watch?feature=player_embed&v=dQw4w9WgXcQ&autohide=1",

    // https://m.youtube.com
    // Standard
    "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://m.youtube.com/v/dQw4w9WgXcQ",
    "https://m.youtube.com/e/dQw4w9WgXcQ",
    "https://m.youtube.com/embed/dQw4w9WgXcQ",
    "https://m.youtube.com/attribution_link?u=/watch%3Fv%3DdQw4w9WgXcQ",
    // With time (query)
    "https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
    "https://m.youtube.com/v/dQw4w9WgXcQ?t=10s",
    "https://m.youtube.com/e/dQw4w9WgXcQ?t=10s",
    "https://m.youtube.com/embed/dQw4w9WgXcQ?t=10s",
    // With other query
    "https://m.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
    "https://m.youtube.com/watch?feature=player_embed&v=dQw4w9WgXcQ&autohide=1",

    // http://m.youtube.com
    // Standard
    "http://m.youtube.com/watch?v=dQw4w9WgXcQ",
    "http://m.youtube.com/v/dQw4w9WgXcQ",
    "http://m.youtube.com/e/dQw4w9WgXcQ",
    "http://m.youtube.com/embed/dQw4w9WgXcQ",
    "http://m.youtube.com/attribution_link?u=/watch%3Fv%3DdQw4w9WgXcQ",
    // With time (query)
    "http://m.youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
    "http://m.youtube.com/v/dQw4w9WgXcQ?t=10s",
    "http://m.youtube.com/e/dQw4w9WgXcQ?t=10s",
    "http://m.youtube.com/embed/dQw4w9WgXcQ?t=10s",
    // With other query
    "http://m.youtube.com/watch?app=desktop&v=dQw4w9WgXcQ",
    "http://m.youtube.com/watch?feature=player_embed&v=dQw4w9WgXcQ&autohide=1",

    // https://www.youtube-nocookie.com
    // Standard
    "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    // With time (query)
    "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?t=10s",

    // http://www.youtube-nocookie.com
    // Standard
    "http://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    // With time (query)
    "http://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?t=10s",
  ];
  for (const url of correctURLs) {
    assertEquals(
      getYouTubeVideoId(url),
      "dQw4w9WgXcQ",
      `💣 url: ${url} => ${getYouTubeVideoId(url)}`,
    );
  }

  const wrongURLs = [
    // "https://youtu.be/v/dQw4w9WgXcQ",
    "https://youtu.be/watch?video=dQw4w9WgXcQ",
  ];
  for (const url of wrongURLs) {
    assertThrows(
      () => getYouTubeVideoId(url),
      `💣 url: ${url}`,
    );
  }
});

Deno.test("[Function] isYouTubeVideoURL", () => {
  for (const url of youTubeURLs) {
    assertEquals(
      isYouTubeVideoURL(url),
      true,
      `💣 url: ${url} is not a YouTube video URL`,
    );
  }
  const wrongURLs = [
    "https://youtu.be/v/dQw4w9WgXcQ",
    "https://youtu.be/watch?video=dQw4w9WgXcQ",
  ];

  for (const url of wrongURLs) {
    assertEquals(
      isYouTubeVideoURL(url),
      false,
      `💣 url: ${url} is a YouTube video URL`,
    );
  }
});

Deno.test("[Function] parseTimeQuery", () => {
  assertEquals(parseTimeQuery("10s"), {
    seconds: 10,
    string: "10s",
  });
  assertEquals(parseTimeQuery("1m10s"), {
    seconds: 70,
    string: "1m10s",
  });
  assertEquals(parseTimeQuery("70s"), {
    seconds: 70,
    string: "1m10s",
  });
});

Deno.test("[Function] perseYouTubeVideoURL", () => {
  assertEquals(parseYouTubeVideoURL("https://youtu.be/dQw4w9WgXcQ"), {
    videoId: "dQw4w9WgXcQ",
    startTime: undefined,
  });
  assertEquals(parseYouTubeVideoURL("https://youtu.be/dQw4w9WgXcQ?t=1m30s"), {
    videoId: "dQw4w9WgXcQ",
    startTime: 90,
  });
});
