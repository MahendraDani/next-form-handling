import { createHash } from "crypto";

export const generateHash = ({ payload }: { payload: string }) => {
  return createHash("sha256").update(payload, "utf8").digest("hex");
};

export const validateHash = ({
  hashValue,
  payload,
}: {
  hashValue: string;
  payload: string;
}): boolean => {
  return hashValue === generateHash({ payload });
};
