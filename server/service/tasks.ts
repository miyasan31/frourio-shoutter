import { depend } from 'velona'
import { PrismaClient } from '@prisma/client'
import type { Task, Prisma } from '$prisma/client'

const prisma = new PrismaClient()

export const getTasks = depend(
  { prisma: prisma as { task: { findMany(): Promise<Task[]> } } },

  async ({ prisma }, limit?: number) => {
    const result = await prisma.task.findMany()
    return result.slice(0, limit)
  }
)

export const createTask = async (label: Task['label']) => {
  return await prisma.task.create({ data: { label } })
}

export const updateTask = async (
  id: Task['id'],
  partialTask: Prisma.TaskUpdateInput
) => {
  return await prisma.task.update({ where: { id }, data: partialTask })
}
export const deleteTask = async (id: Task['id']) => {
  return await prisma.task.delete({ where: { id } })
}
