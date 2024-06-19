import { Dictionary } from "@prisma/client";
import prisma from "../prisma";

export class DictionaryService {
  constructor() {}

  async insert({ word }: { word: string }) {
    const data = await prisma.dictionary.create({
      data: {
        word,
      },
    });

    return { data };
  }

  // returns number of records in table implies number of responses generated till date
  async getCount() {
    const count = await prisma.dictionary.count();
    return { count };
  }

  async getCountByWord({ word }: { word: string }) {
    const count = await prisma.dictionary.count({
      where: {
        word,
      },
    });
  }
}
