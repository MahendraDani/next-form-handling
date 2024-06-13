import { NextResponse } from "next/server";
import { TErrorHelpText, TErrorStatus } from "./types";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class EApiError extends Error {
  readonly status;
  readonly helpText;
  constructor({
    message,
    status,
    helpText,
  }: {
    message: string;
    status: TErrorStatus;
    helpText: TErrorHelpText;
  }) {
    super(message);
    this.status = status;
    this.helpText = helpText;
  }
}

export const hanldeApiError = (error: EApiError) => {
  return NextResponse.json(
    {
      error: {
        message: error.message,
        code: error.helpText,
        status: error.status,
      },
    },
    {
      status: error.status,
      statusText: error.helpText,
    }
  );
};

export const handlePrismaKnownError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  return NextResponse.json(
    {
      error: {
        message: error.message,
        code: error.code,
        status: 500,
      },
    },
    {
      status: 500,
      statusText: "prisma_error",
    }
  );
};

export const hanldeInternalError = () => {
  return NextResponse.json(
    {
      error: {
        message: "something went wrong",
        code: "internal_server_error",
        status: 500,
      },
    },
    {
      status: 500,
      statusText: "internal_server_error",
    }
  );
};

export const handleZodError = (error: ZodError) => {
  return NextResponse.json(
    {
      error: {
        message: error.errors[0].message,
        error,
      },
    },
    {
      status: 400,
      statusText: "bad_request",
    }
  );
};
