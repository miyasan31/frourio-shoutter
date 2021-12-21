import { PrismaClient } from '@prisma/client';
import { depend } from 'velona';

import type { Prisma, Reply } from '$prisma/client';

const prisma = new PrismaClient();

const testUserId = 'miyasan_0301';

// not used
export const getReplyList = depend(
  { prisma: prisma as { reply: { findMany(): Promise<Reply[]> } } },
  async ({ prisma }) => {
    const result = await prisma.reply.findMany();
    return result;
  }
);

// [userId]/reply/[tweetId].page.tsx
export const getReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        findUnique(query: Prisma.ReplyFindUniqueArgs): Promise<Reply>;
      };
    }
  },
  async ({ prisma }, id: Reply['id']) => {
    const result = await prisma.reply.findUnique({
      where: {
        id: id
      },
      include: {
        // reply -> user
        user: {
          include: {
            // user is followed
            followers: {
              where: { userId: testUserId },
              select: { id: true }
            },
            // countings on user follow
            _count: {
              select: { followers: true, followings: true }
            }
          }
        }
      }
    });
    return result;
  }
);

export const createReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        create(query: Prisma.ReplyCreateArgs): Promise<Reply>;
      };
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createReply: Prisma.ReplyUncheckedCreateInput
    createReply: Prisma.ReplyCreateInput
  ) => {
    const result = await prisma.reply.create({
      data: createReply
    });
    return result;
  }
);

export const updateReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        update(query: Prisma.ReplyUpdateArgs): Promise<Reply>;
      };
    }
  },
  async (
    { prisma },
    id: Reply['id'],
    // miyasan31:key1
    // updateReply: Prisma.ReplyUncheckedUpdateInput
    updateReply: Prisma.ReplyUpdateInput
  ) => {
    const result = await prisma.reply.update({
      where: {
        id: id
      },
      data: updateReply
    });
    return result;
  }
);

export const deleteReply = depend(
  {
    prisma: prisma as unknown as {
      reply: {
        delete(query: Prisma.ReplyDeleteArgs): Promise<Reply>;
      };
    }
  },
  async ({ prisma }, id: Reply['id']) => {
    const result = await prisma.reply.delete({
      where: {
        id: id
      }
    });

    return result;
  }
);
