import { cookies } from "next/headers";
import { verifyJWT } from "./jwt";

export const getCurrentSession = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return { user: null };
  }

  const decoded = verifyJWT({ token });
  return { user: decoded };
};

export const getCurrentSessionToken = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return { token: null };
  }
  return { token };
};
