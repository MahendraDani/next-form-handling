export type TErrorStatus = 400 | 401 | 403 | 404 | 409 | 429;
export type TErrorHelpText =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict";
