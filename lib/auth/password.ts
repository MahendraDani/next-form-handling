import { generateHash, validateHash } from "./hash";

export const hashPassword = ({ rawPassword }: { rawPassword: string }) => {
  return generateHash({ payload: rawPassword });
};

export const validatePassword = ({
  rawPassword,
  hashedPassword,
}: {
  rawPassword: string;
  hashedPassword: string;
}): boolean => {
  return validateHash({ hashValue: hashedPassword, payload: rawPassword });
};
