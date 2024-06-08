import {
  EApiError,
  handlePrismaKnownError,
  hanldeApiError,
  hanldeInternalError,
} from "@/lib/error";
import { database } from "@/lib/services";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface IContext {
  params: {
    id: string;
  };
}

// GET /api/accounts/:id Get account by id
export const GET = async (req: NextRequest, { params }: IContext) => {
  try {
    const { id } = params;
    const { account } = await database.accounts.getById({ id: parseInt(id) });
    return NextResponse.json({ account }, { status: 200, statusText: "ok" });
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    }

    return hanldeInternalError();
  }
};

export const DELETE = async (req: NextRequest, { params }: IContext) => {
  try {
    const { id } = params;
    const { account } = await database.accounts.deleteById({
      id: parseInt(id),
    });
    return NextResponse.json(
      { message: "Account deleted successfully", id: account.id },
      { status: 200, statusText: "ok" }
    );
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    }

    return hanldeInternalError();
  }
};
