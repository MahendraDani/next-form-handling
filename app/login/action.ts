"use server";

import { generateJWT } from "@/lib/auth/jwt";
import { validatePassword } from "@/lib/auth/password";
import { database } from "@/lib/services";
import { ZCreateAccountSchema } from "@/lib/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type TActionErrorType =
  | "validationError:email"
  | "validationError:password"
  | "databaseError"
  | "internalError"
  | null;

export interface IPrevStateLoginAction {
  message: string;
  isError: boolean;
  errorType: TActionErrorType;
}

export const loginAction = async (
  prevState: IPrevStateLoginAction,
  formData: FormData
): Promise<IPrevStateLoginAction> => {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  const parsed = ZCreateAccountSchema.safeParse({
    email: emailRaw,
    password: passwordRaw,
  });

  if (!parsed.success) {
    return {
      message: parsed.error.errors[0].message,
      isError: true,
      errorType:
        parsed.error.errors[0].path[0] === "email"
          ? "validationError:email"
          : "validationError:password",
    };
  }

  const { account } = await database.accounts.getByEmail({
    email: parsed.data.email,
  });

  if (!account) {
    return {
      message: "Account with provided not found, please signup!",
      isError: true,
      errorType: "databaseError",
    };
  }

  if (
    !validatePassword({
      rawPassword: parsed.data.password,
      hashedPassword: account.password,
    })
  ) {
    return {
      message: "Incorrect password",
      isError: true,
      errorType: "databaseError",
    };
  }
  const token = generateJWT({
    payload: account,
  });
  // 15 days -> 15 * 24 * 60 * 60 * 1000
  cookies().set("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  redirect("/feedback");
  return {
    message: "Login successful",
    isError: false,
    errorType: null,
  };
};

/*
Prev state =>
message : string // To be displayed in toast
isError : boolean // to get the context if there is error or not
errorType : "zodError" | "databaseError" | "internalError" to conditionaly show error message based on error type
*/
