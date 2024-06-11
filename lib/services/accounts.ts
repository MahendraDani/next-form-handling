import prisma from "../prisma";
import { EApiError } from "../error";
import { hashPassword } from "../auth/password";

interface ICreateAccountParams {
  email: string;
  password: string;
}

interface IGetAccountByEmailParams {
  email: string;
}

export class AccountService {
  constructor() {}

  async create({ email, password }: ICreateAccountParams) {
    const { account } = await this.getByEmail({ email });
    if (account) {
      throw new EApiError({
        message: "Account with provided email already exists!",
        helpText: "conflict",
        status: 409,
      });
    }

    const hashedPassword = hashPassword({ rawPassword: password });

    try {
      const newAccount = await prisma.accounts.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return { account: newAccount };
    } catch (error) {
      throw error;
    }
  }

  async getByEmail({ email }: IGetAccountByEmailParams) {
    const data = await prisma.accounts.findFirst({
      where: {
        email,
      },
    });

    return {
      account: data,
    };
  }

  async getById({ id }: { id: number }) {
    const data = await prisma.accounts.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new EApiError({
        message: "Account associated with given id not found",
        status: 404,
        helpText: "not_found",
      });
    }
    return { account: data };
  }

  async getAll() {
    const accounts = await prisma.accounts.findMany();
    return { accounts };
  }

  async deleteById({ id }: { id: number }) {
    const { account } = await this.getById({ id });
    const deletedAccount = await prisma.accounts.delete({
      where: {
        id,
      },
    });

    return { account: deletedAccount };
  }
}
