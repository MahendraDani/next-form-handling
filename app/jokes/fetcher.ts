import { z } from "zod";
import { ZJokeFormSchema } from "@/lib/zod";

export const fetchJokeAPI = async ({
  jokeType,
  category,
  blackListFlags,
}: z.infer<typeof ZJokeFormSchema>) => {
  let url: string = process.env.JOKE_API || "https://v2.jokeapi.dev/joke";
  if (category) {
    url = `${url}/${category}`;
  } else {
    url = `${url}/Any`;
  }

  url = `${url}?type=${jokeType}`;
  if (blackListFlags) {
    url = `${url}&blacklistFlags=${blackListFlags}`;
  }

  const res = await fetch(url, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      priority: "u=1, i",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      Referer: "https://v2.jokeapi.dev/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const response = await res.json();
  return { response };
};
