import { decodeJWT } from "./jwt";
import { getCookie } from "cookies-next";

export const getClientSession = () => {
  const token = getCookie("token");
  if (!token) {
    throw new Error("Client token not found");
  }
  const decoded = decodeJWT(token);
  return { user: decoded };
};
