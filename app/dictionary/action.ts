"use server";

import { database } from "@/lib/services";
import { ZWordFormSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";

type TActionErrorType =
  | "validationError"
  | "databaseError"
  | "internalError"
  | null;
export interface IfetchWordMeaningActionPrevState {
  isError: boolean;
  message: string;
  // TODO : Fix the output types
  response: any | null;
  errorType: TActionErrorType;
}
export const fetchWordMeaningAction = async (
  prevState: IfetchWordMeaningActionPrevState,
  formData: FormData
): Promise<IfetchWordMeaningActionPrevState> => {
  const parsed = ZWordFormSchema.safeParse({
    word: formData.get("word"),
  });

  if (!parsed.success) {
    return {
      isError: true,
      errorType: "validationError",
      response: null,
      message: parsed.error.errors[0].message,
    };
  }

  try {
    // fetch api
    const r = await fetch(`${process.env.DICTIONARY_API}/${parsed.data.word}`, {
      method: "GET",
    });

    if (!r.ok) {
      return {
        isError: true,
        errorType: "internalError",
        message: "something went wrong",
        response: null,
      };
    }
    const response = await r.json();

    await database.dictionary.insert({ word: parsed.data.word });
    return {
      isError: false,
      errorType: null,
      message: "Success",
      response,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        isError: true,
        errorType: "databaseError",
        response: null,
        message: error.message,
      };
    }

    return {
      isError: true,
      errorType: "internalError",
      response: null,
      message: "Oops, something went wrong. Please try again",
    };
  }
};
