import {
  EApiError,
  handlePrismaKnownError,
  hanldeApiError,
  hanldeInternalError,
} from "@/lib/error";
import { database } from "@/lib/services";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

interface IContext {
  params: {
    id: string;
  };
}

// GET get a feedback by its id
export const GET = async (req: NextRequest, { params }: IContext) => {
  try {
    const schema = z.object({
      id: z.string(),
    });
    const parsed = schema.parse({ id: params.id });

    const { feedback } = await database.feedbacks.get({
      id: parseInt(parsed.id),
    });
    return NextResponse.json({ feedback }, { status: 200, statusText: "ok" });
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    } else if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Zod validation error", error },
        { status: 400 }
      );
    }

    return hanldeInternalError();
  }
};

export const DELETE = async (req: NextRequest, { params }: IContext) => {
  try {
    const schema = z.object({
      id: z.string(),
      userId: z
        .string()
        .min(1, { message: "userId is required" })
        .refine((val) => {
          const regexp = /^[0-9]+$/;
          return regexp.test(val);
        }),
    });
    const userId = req.nextUrl.searchParams.get("userId");

    const parsed = schema.parse({ id: params.id, userId });
    const { feedback } = await database.feedbacks.deleteById({
      id: parseInt(parsed.id),
      userId: parseInt(parsed.userId),
    });
    return NextResponse.json({ feedback }, { status: 200, statusText: "ok" });
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    } else if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Zod validation error", error },
        { status: 400 }
      );
    }

    return hanldeInternalError();
  }
};
