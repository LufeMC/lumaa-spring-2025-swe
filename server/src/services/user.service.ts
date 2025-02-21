import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { username, password: hashedPassword },
  });
};

export const findUserByUsername = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
