export const code = `import { z } from "zod";
import { ZJokeFormSchema } from "./types";

export const fetchJokeAPI = async ({
  jokeType,
  category,
  blackListFlags,
}: z.infer<typeof ZJokeFormSchema>) => {
  let url: string = process.env.JOKE_API || "https://v2.jokeapi.dev/joke";
  if (category) {
    url = \`\${url}/\${category}\`;
  } else {
    url = \`\${url}/Any\`;
  }

  url = \`\${url}?type=\${jokeType}\`;
  if (blackListFlags) {
    url = \`\${url}&blacklistFlags=\${blackListFlags}\`;
  }

  const res = await fetch(url, {
    headers: {
    // ...,
    },
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const response = await res.json();
  return { response };
};
`;
