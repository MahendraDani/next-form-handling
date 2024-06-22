import { TJokeCategory, TJokeType } from "./zod";

export type TErrorStatus = 400 | 401 | 403 | 404 | 409 | 429;
export type TErrorHelpText =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict";

export type TSingleJokeResponse = {
  error: boolean;
  category: TJokeCategory;
  type: TJokeType;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: "en";
};

export type TTwoPartJokeResponse = {
  error: boolean;
  category: TJokeCategory;
  type: TJokeType;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: "en";
};
