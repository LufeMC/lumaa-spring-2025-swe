import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (userId: string) => {
  return prisma.task.findMany({ where: { userId } });
};

export const createTask = async (userId: string, title: string, description?: string) => {
  return prisma.task.create({
    data: { title, description, userId },
  });
};

export const updateTask = async (taskId: string, data: any) => {
  return prisma.task.update({ where: { id: taskId }, data });
};

export const deleteTask = async (taskId: string) => {
  return prisma.task.delete({ where: { id: taskId } });
};
