export const code = `"use server";

import { database } from "@/lib/services";
import { Prisma } from "@prisma/client";
import { IPrevState, ZWordFormSchema} from "./types.ts"

export const Action = async (
  prevState: IPrevState,
  formData: FormData
): Promise<IPrevState> => {
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
    const res = await fetch(
      \`\${process.env.DICTIONARY_API}/\${parsed.data.word}\`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      return {
        isError: true,
        errorType: "internalError",
        message: "something went wrong",
        response: null,
      };
    }
    const response = await res.json();

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
    console.log(error);
    return {
      isError: true,
      errorType: "internalError",
      response: null,
      message: "Oops, something went wrong. Please try again",
    };
  }
};
`;
