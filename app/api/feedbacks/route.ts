import {
  EApiError,
  handlePrismaKnownError,
  handleZodError,
  hanldeApiError,
  hanldeInternalError,
} from "@/lib/error";
import { database } from "@/lib/services";
import { ICreateFeedback } from "@/lib/services/feedback";
import {
  isValidTwitterUrl,
  transformTwitterToXUrl,
  validateUrls,
} from "@/lib/valid-urls";
import { ZFeedbackFormSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const raw: ICreateFeedback = await req.json();
    const parsed = ZFeedbackFormSchema.parse(raw);
    validateUrls({
      githubUrl: parsed.githubUrl,
      linkedinUrl: parsed.linkedinUrl,
      twitterUrl: parsed.twitterUrl,
    });

    const { feedback } = await database.feedbacks.create(parsed);
    return NextResponse.json(
      { feedback },
      { status: 200, statusText: "created" }
    );
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    } else if (error instanceof ZodError) {
      // return NextResponse.json(
      //   { message: "Zod validation error", error },
      //   { status: 400 }
      // );
      return handleZodError(error);
    }

    return hanldeInternalError();
  }
};

// GET api/feedbacks get all feedbacks
export const GET = async (req: NextRequest) => {
  try {
    const { feedbacks } = await database.feedbacks.getAll();
    return NextResponse.json({ feedbacks }, { status: 200, statusText: "ok" });
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
