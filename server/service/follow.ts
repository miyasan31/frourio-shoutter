import { PrismaClient } from '@prisma/client';
import { depend } from 'velona';

import type { Follow, Prisma } from '$prisma/client';

const prisma = new PrismaClient();

export const createFollow = depend(
  {
    prisma: prisma as unknown as {
      follow: {
        create(query: Prisma.FollowCreateArgs): Promise<Follow>;
      };
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createFollow: Prisma.FollowUncheckedCreateInput
    createFollow: Prisma.FollowCreateInput
  ) => {
    const result = await prisma.follow.create({
      data: createFollow
    });
    return result;
  }
);

export const deleteFollow = depend(
  {
    prisma: prisma as unknown as {
      follow: {
        delete(query: Prisma.FollowDeleteArgs): Promise<Follow>;
      };
    }
  },
  async ({ prisma }, id: Follow['id']) => {
    const result = await prisma.follow.delete({
      where: {
        id: id
      }
    });
    return result;
  }
);
