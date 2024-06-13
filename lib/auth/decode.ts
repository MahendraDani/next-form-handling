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
