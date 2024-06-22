import prisma from "../prisma";
import { JokeCategory, JokeType } from "@prisma/client";

interface IInsertJokeProps {
  category: JokeCategory;
  jokeType: JokeType;
  jokeId: number;
}
export class JokesService {
  constructor() {}

  async insert({ category, jokeId, jokeType }: IInsertJokeProps) {
    const data = await prisma.jokes.create({
      data: {
        category,
        jokeType,
        jokeId,
      },
    });
    return { data };
  }

  async getCount() {
    const count = await prisma.jokes.count();
    return { count };
  }
}
