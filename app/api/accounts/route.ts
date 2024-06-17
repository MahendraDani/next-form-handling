import { generateJWT } from "@/lib/auth/jwt";
import {
  EApiError,
  handlePrismaKnownError,
  hanldeApiError,
  hanldeInternalError,
} from "@/lib/error";
import { database } from "@/lib/services";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// POST /api/accounts create a new account
export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const { account } = await database.accounts.create({
      email,
      password,
    });

    const token = generateJWT({
      payload: account,
    });
    cookies().set("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    }

    console.error(error);
    return hanldeInternalError();
  }
};

// GET /api/accounts get all accounts
export const GET = async (req: NextRequest) => {
  try {
    const { accounts } = await database.accounts.getAll();
    return NextResponse.json({ accounts }, { status: 200 });
  } catch (error) {
    if (error instanceof EApiError) {
      return hanldeApiError(error);
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return handlePrismaKnownError(error);
    }

    return hanldeInternalError();
  }
};
