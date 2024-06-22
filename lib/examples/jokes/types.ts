export const code = `export const ZJokeType = z.enum(["single", "twopart"]);
export type TJokeType = z.infer<typeof ZJokeType>;

export const ZJokeCategory = z.enum([
  "Programming",
  "Misc",
  "Dark",
  "Pun",
  "Spooky",
  "Christmas",
]);

export type TJokeCategory = z.infer<typeof ZJokeCategory>;

const ZBlackListFlags = z.enum([
  "nsfw",
  "religious",
  "political",
  "racist",
  "sexist",
  "explicit",
]);

export const ZJokeFormSchema = z.object({
  jokeType: ZJokeType,
  category: ZJokeCategory.nullable(),
  blackListFlags: ZBlackListFlags.nullable(),
});
`;
