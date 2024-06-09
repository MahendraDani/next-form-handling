import jwt from "jsonwebtoken";

interface IgenerateJWTPayload {
  id: number;
  email: string;
  password: string;
}
export const generateJWT = ({ payload }: { payload: IgenerateJWTPayload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15d" });
};

export const verifyJWT = ({ token }: { token: string }) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
