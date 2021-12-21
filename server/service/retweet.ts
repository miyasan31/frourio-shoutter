import { PrismaClient } from '@prisma/client';
import { depend } from 'velona';

import type { Prisma, Retweet } from '$prisma/client';

const prisma = new PrismaClient();

export const createRetweet = depend(
  {
    prisma: prisma as unknown as {
      retweet: {
        create(query: Prisma.RetweetCreateArgs): Promise<Retweet>;
      };
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createRetweet: Prisma.RetweetUncheckedCreateInput
    createRetweet: Prisma.RetweetCreateInput
  ) => {
    const result = await prisma.retweet.create({
      data: createRetweet
    });
    return result;
  }
);

export const deleteRetweet = depend(
  {
    prisma: prisma as unknown as {
      retweet: {
        delete(query: Prisma.RetweetDeleteArgs): Promise<Retweet>;
      };
    }
  },
  async ({ prisma }, id: Retweet['id']) => {
    const result = await prisma.retweet.delete({
      where: {
        id: id
      }
    });
    return result;
  }
);
