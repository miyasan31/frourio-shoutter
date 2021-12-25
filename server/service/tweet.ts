import { PrismaClient } from '@prisma/client';
import { depend } from 'velona';

import type { GetTweetDetail } from '$/types/tweet';
import type { Prisma, Tweet, User } from '$prisma/client';

const prisma = new PrismaClient();

// not used
// export const getTweetList = depend(
//   {
//     prisma: prisma as unknown as {
//       tweet: { findMany(query: Prisma.TweetFindManyArgs): Promise<GetTweet[]> };
//     }
//   },
//   async ({ prisma }) => {
//     const result = await prisma.tweet.findMany({
//       orderBy: { createdAt: 'desc' },
//       include: {
//         // user is liked
//         likes: {
//           where: { userId: testUserId },
//           select: { id: true }
//         },
//         // user is retweeted
//         retweets: {
//           where: { userId: testUserId },
//           select: { id: true }
//         },
//         // tweet -> replies
//         replies: {
//           // sotr by createdAt asc
//           orderBy: { createdAt: 'asc' },
//           include: {
//             // replies -> user
//             user: {
//               include: {
//                 // user is followed
//                 followers: {
//                   where: { userId: testUserId },
//                   select: { id: true }
//                 },
//                 // countings on user follow
//                 _count: {
//                   select: { followers: true, followings: true }
//                 }
//               }
//             }
//           }
//         },
//         // countings on tweet
//         _count: {
//           select: { replies: true, retweets: true, likes: true }
//         }
//       }
//     });
//     return result;
//   }
// );

// [userId]/tweet/[tweetId].page.tsx
export const getTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        findUnique(query: Prisma.TweetFindUniqueArgs): Promise<GetTweetDetail>;
      };
    }
  },
  async ({ prisma }, id: Tweet['id'], reqestUserId: User['id']) => {
    const result = await prisma.tweet.findUnique({
      where: {
        id: id
      },
      include: {
        // user is liked
        likes: {
          where: { userId: reqestUserId },
          select: { id: true }
        },
        // user is retweeted
        retweets: {
          where: { userId: reqestUserId },
          select: { id: true }
        },
        // countings on tweet
        _count: {
          select: { replies: true, retweets: true, likes: true }
        },
        // tweet -> user
        user: {
          include: {
            // user is followed
            followers: {
              where: { userId: reqestUserId },
              select: { id: true }
            },
            // countings on user follow
            _count: {
              select: { followers: true, followings: true }
            }
          }
        },
        // tweet -> replies
        replies: {
          // sotr by createdAt asc
          orderBy: { createdAt: 'asc' },
          include: {
            // replies -> user
            user: {
              include: {
                // user is followed
                followers: {
                  where: { userId: reqestUserId },
                  select: { id: true }
                },
                // countings on user follow
                _count: {
                  select: { followers: true, followings: true }
                }
              }
            }
          }
        }
      }
    });
    return result;
  }
);

export const createTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: { create(query: Prisma.TweetCreateArgs): Promise<Tweet> };
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createTweet: Prisma.TweetUncheckedCreateInput
    createTweet: Prisma.TweetCreateInput
  ) => {
    const result = await prisma.tweet.create({
      data: createTweet
    });
    return result;
  }
);

export const updateTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        update(query: Prisma.TweetUpdateArgs): Promise<Tweet>;
      };
    }
  },
  async (
    { prisma },
    id: Tweet['id'],
    // miyasan31:key1
    // updateTweet: Prisma.TweetUncheckedUpdateInput
    updateTweet: Prisma.TweetUpdateInput
  ) => {
    const result = await prisma.tweet.update({
      where: {
        id: id
      },
      data: updateTweet
    });
    return result;
  }
);

export const deleteTweet = depend(
  {
    prisma: prisma as unknown as {
      tweet: {
        delete(query: Prisma.TweetDeleteArgs): Promise<Tweet>;
      };
    }
  },
  async ({ prisma }, id: Tweet['id']) => {
    const result = await prisma.tweet.delete({
      where: {
        id: id
      }
    });
    return result;
  }
);
