var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { depend } from 'velona';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getTasks = depend({ prisma: prisma }, ({ prisma }, limit) => __awaiter(void 0, void 0, void 0, function* () { return (yield prisma.task.findMany()).slice(0, limit); }));
export const createTask = (label) => prisma.task.create({ data: { label } });
export const updateTask = (id, partialTask) => prisma.task.update({ where: { id }, data: partialTask });
export const deleteTask = (id) => prisma.task.delete({ where: { id } });
