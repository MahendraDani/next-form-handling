import { database } from ".";
import { EApiError } from "../error";
import prisma from "../prisma";

export interface ICreateFeedback {
  name: string;
  feedback: string;
  userId: number;
  githubUrl: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  occupation: string;
  makePublic?: boolean;
}
export class FeedbackService {
  constructor() {}

  async getByUserId({ userId }: { userId: number }) {
    const data = await prisma.feedback.findUnique({
      where: {
        userId,
      },
    });
    return { feedback: data };
  }

  async get({ id }: { id: number }) {
    const data = await prisma.feedback.findUnique({
      where: {
        id,
      },
    });
    if (!data) {
      throw new EApiError({
        message: "Feedback not found",
        status: 404,
        helpText: "not_found",
      });
    }
    return { feedback: data };
  }

  async getAll() {
    const data = await prisma.feedback.findMany();

    return { feedbacks: data };
  }

  async create({
    name,
    feedback,
    twitterUrl,
    githubUrl,
    linkedinUrl,
    userId,
    occupation,
    makePublic,
  }: ICreateFeedback) {
    const { feedback: existingFeedback } = await this.getByUserId({
      userId,
    });
    if (existingFeedback) {
      throw new EApiError({
        message: "Feedback already exists",
        helpText: "bad_request",
        status: 400,
      });
    }
    const data = await prisma.feedback.create({
      data: {
        userId,
        name,
        feedback,
        githubUrl,
        twitterUrl,
        linkedinUrl,
        occupation,
        makePublic,
      },
    });

    return { feedback: data };
  }

  async deleteById({ id, userId }: { id: number; userId: number }) {
    await this.get({ id });
    const deletedFeedback = await prisma.feedback.delete({
      where: {
        id,
        userId,
      },
    });
    return { feedback: deletedFeedback };
  }
}
