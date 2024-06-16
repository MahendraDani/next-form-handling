import { decodeJWT } from "./jwt";
import { getCookie } from "cookies-next";

export const getClientSession = () => {
  const token = getCookie("token");
  if (!token) {
    return { user: null };
  }
  const decoded = decodeJWT(token);
  return { user: decoded };
};
