import { PrismaClient } from '@prisma/client';
import { depend } from 'velona';

import type { Like, Prisma } from '$prisma/client';

const prisma = new PrismaClient();

export const createLike = depend(
  {
    prisma: prisma as unknown as {
      like: {
        create(query: Prisma.LikeCreateArgs): Promise<Like>;
      };
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createLike: Prisma.LikeUncheckedCreateInput
    createLike: Prisma.LikeCreateInput
  ) => {
    const result = await prisma.like.create({
      data: createLike
    });
    return result;
  }
);

export const deleteLike = depend(
  {
    prisma: prisma as unknown as {
      like: {
        delete(query: Prisma.LikeDeleteArgs): Promise<Like>;
      };
    }
  },
  async ({ prisma }, id: Like['id']) => {
    const result = await prisma.like.delete({
      where: {
        id: id
      }
    });

    return result;
  }
);
