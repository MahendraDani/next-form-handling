"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { EApiError } from "@/lib/error";
import { database } from "@/lib/services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface IPrevStateLogoutAction {
  message: string;
  isError: boolean;
  errorType: "databaseError" | "validationError" | "internalError" | null;
}

export const logoutAction = async (
  prevState: IPrevStateLogoutAction,
  formData: FormData
): Promise<IPrevStateLogoutAction> => {
  const { user } = getCurrentSession();
  if (!user) {
    return {
      message: "Active session not found",
      isError: true,
      errorType: "databaseError",
    };
  }
  try {
    const { account } = await database.accounts.getById({ id: user.id });
  } catch (error) {
    if (error instanceof EApiError) {
      return {
        message: error.message,
        isError: true,
        errorType: "databaseError",
      };
    }

    console.error(error);
    return {
      message: "something went wrong",
      isError: true,
      errorType: "internalError",
    };
  }

  cookies().delete("token");
  redirect("/");
  return {
    message: "Lougout sucessfull",
    isError: false,
    errorType: null,
  };
};
