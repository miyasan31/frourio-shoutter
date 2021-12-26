import { PrismaClient } from '@prisma/client';
import { depend } from 'velona';

import { GetHome, GetMyTweet } from '$/types/home';
import type { Prisma, User } from '$prisma/client';

const prisma = new PrismaClient();

export const getFollowingUserTweetList = depend(
  {
    prisma: prisma as unknown as {
      follow: {
        findMany(query: Prisma.FollowFindManyArgs): Promise<GetHome>;
      };
      tweet: {
        findMany(query: Prisma.TweetFindManyArgs): Promise<GetMyTweet>;
      };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const currentUserTweetResult = await prisma.tweet.findMany({
      where: {
        userId: id
      },
      // sotr by createdAt desc
      orderBy: { createdAt: 'desc' },
      include: {
        // tweet -> user
        user: {
          include: {
            // user is followed
            followers: {
              where: { userId: id },
              select: { id: true }
            },
            // countings on user follow
            _count: {
              select: { followers: true, followings: true }
            }
          }
        },
        // user is liked
        likes: {
          where: { userId: id },
          select: { id: true }
        },
        // user is retweeted
        retweets: {
          where: { userId: id },
          select: { id: true }
        },
        // countings on tweet
        _count: {
          select: { replies: true, retweets: true, likes: true }
        }
      }
    });

    const followingUserTweetResult = await prisma.follow.findMany({
      where: {
        // is following user
        userId: id
      },
      include: {
        // following -> user
        following: {
          include: {
            // following(user) is followed
            followers: {
              where: { userId: id },
              select: { id: true }
            },
            // countings on user follow
            _count: {
              select: { followers: true, followings: true }
            },

            // user -> tweets
            tweets: {
              // sotr by createdAt desc
              orderBy: { createdAt: 'desc' },
              include: {
                // tweet -> user
                user: {
                  include: {
                    // user is followed
                    followers: {
                      where: { userId: id },
                      select: { id: true }
                    },
                    // countings on user follow
                    _count: {
                      select: { followers: true, followings: true }
                    }
                  }
                },
                // user is liked
                likes: {
                  where: { userId: id },
                  select: { id: true }
                },
                // user is retweeted
                retweets: {
                  where: { userId: id },
                  select: { id: true }
                },
                // countings on tweet
                _count: {
                  select: { replies: true, retweets: true, likes: true }
                }
              }
            },

            // user -> replies
            replies: {
              // sotr by createdAt desc
              orderBy: { createdAt: 'desc' },
              include: {
                // reply -> tweet
                tweet: true,
                // reply -> user
                user: {
                  include: {
                    // user is followed
                    followers: {
                      where: { userId: id },
                      select: { id: true }
                    },
                    // countings on user follow
                    _count: {
                      select: { followers: true, followings: true }
                    }
                  }
                }
              }
            },

            // user -> retweets
            retweets: {
              // sotr by createdAt desc
              orderBy: { createdAt: 'desc' },
              include: {
                // retweet -> user
                user: true,
                // retweets -> tweet
                tweet: {
                  include: {
                    // tweet -> user
                    user: {
                      include: {
                        // user is followed
                        followers: {
                          where: { userId: id },
                          select: { id: true }
                        },
                        // countings on user follow
                        _count: {
                          select: { followers: true, followings: true }
                        }
                      }
                    },
                    // user is liked
                    likes: {
                      where: { userId: id },
                      select: { id: true }
                    },
                    // user is retweeted
                    retweets: {
                      where: { userId: id },
                      select: { id: true }
                    },
                    // countings on tweet
                    _count: {
                      select: { replies: true, retweets: true, likes: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    return {
      currentUser: currentUserTweetResult,
      followingUser: followingUserTweetResult
    };
  }
);
