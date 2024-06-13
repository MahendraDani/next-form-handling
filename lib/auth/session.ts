import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";
import { DecodedJWT } from "./decode";

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
