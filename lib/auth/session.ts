import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

export interface DecodedJWT {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}
export const isDecodedJWT = (payload: any): payload is DecodedJWT => {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "id" in payload &&
    "email" in payload &&
    "password" in payload &&
    "createdAt" in payload &&
    "updatedAt" in payload &&
    "iat" in payload &&
    "exp" in payload
  );
};

export const getCurrentSession = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return { user: null };
  }

  try {
    const decoded: DecodedJWT = verifyJWT(token);
    return { user: decoded };
  } catch (error) {
    console.error("Failed to verify token:", error);
    return { user: null };
  }
};

export const getCurrentSessionToken = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return { token: null };
  }
  return { token };
};
