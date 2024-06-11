import jwt, { JwtPayload } from "jsonwebtoken";
import { DecodedJWT, isDecodedJWT } from "./session";

interface IgenerateJWTPayload {
  id: number;
  email: string;
  password: string;
}
export const generateJWT = ({ payload }: { payload: IgenerateJWTPayload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15d" });
};

export const verifyJWT = (token: string): DecodedJWT => {
  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, secret) as JwtPayload | string;

  if (typeof decoded === "string" || !isDecodedJWT(decoded)) {
    throw new Error("Invalid token payload");
  }

  return decoded;
};
