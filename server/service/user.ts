import { PrismaClient } from '@prisma/client';
import httpsRequest from 'request-promise';
// import { Multipart } from 'fastify-multipart';
// import fs from 'fs';
// import path from 'path';
import { depend } from 'velona';

import { FASTIFY_AUTH0_DOMAIN } from '$/service/envValues';
import {
  GetAllUser,
  GetFollowerList,
  GetFollowingList,
  GetLikeList,
  GetReplyList,
  GetRetweetList,
  GetTweetList,
  GetUser
} from '$/types/user';
import type { Prisma, User } from '$prisma/client';

import {
  // API_ORIGIN,
  // API_UPLOAD_DIR,
  API_USER_ID,
  API_USER_PASS
} from './envValues';

const prisma = new PrismaClient();

const testUserId = 'miyasan_0301';

// not used
export const getUserList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetAllUser> };
    }
  },
  async ({ prisma }) => {
    const result = await prisma.user.findMany({
      include: {
        // countings on user follow
        _count: {
          select: { followers: true, followings: true }
        }
      }
    });
    return result;
  }
);

export const getSignupUserCheck = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findUnique(query: Prisma.UserFindUniqueArgs): Promise<User>;
      };
    }
  },
  async ({ prisma }, email: User['email']) => {
    const result = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return result;
  }
);

// [userId]/index.page.tsx
export const getUserTweetList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findUnique(query: Prisma.UserFindManyArgs): Promise<GetTweetList>;
      };
    }
  },
  async ({ prisma }, id: User['id'], reqestUserId: User['id']) => {
    const result = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        // user -> tweets
        tweets: {
          // sotr by createdAt desc
          orderBy: { createdAt: 'desc' },
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
            }
          }
        },
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
    });
    return result;
  }
);

// [userId]/reply.page.tsx
export const getUserReplyList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetReplyList> };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      // sotr by createdAt desc
      orderBy: { createdAt: 'desc' },
      include: {
        // user -> replies
        replies: true,
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
    });
    return result;
  }
);

// [userId]/like.page.tsx
export const getUserLikeList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetLikeList> };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        // user -> likes
        likes: {
          // sotr by createdAt desc
          orderBy: { createdAt: 'desc' },
          include: {
            // likes -> tweet
            tweet: {
              include: {
                // tweet -> user
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
                },
                // user is liked
                likes: {
                  where: { userId: testUserId },
                  select: { id: true }
                },
                // user is retweeted
                retweets: {
                  where: { userId: testUserId },
                  select: { id: true }
                },
                // countings on tweet
                _count: {
                  select: { replies: true, retweets: true, likes: true }
                }
              }
            }
          }
        },
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
    });
    return result;
  }
);

// [userId]/retweet.page.tsx
export const getUserRetweetList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findMany(query: Prisma.UserFindManyArgs): Promise<GetRetweetList>;
      };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        // tweet -> retweets
        retweets: {
          // sotr by createdAt desc
          orderBy: { createdAt: 'desc' },
          include: {
            // retweets -> tweet
            tweet: {
              include: {
                // tweet -> user
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
                },
                // user is liked
                likes: {
                  where: { userId: testUserId },
                  select: { id: true }
                },
                // user is retweeted
                retweets: {
                  where: { userId: testUserId },
                  select: { id: true }
                },
                // countings on tweet
                _count: {
                  select: { replies: true, retweets: true, likes: true }
                }
              }
            }
          }
        },
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
    });
    return result;
  }
);

// [userId]/follower.page.tsx
export const getUserFollowerList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findMany(query: Prisma.UserFindManyArgs): Promise<GetFollowerList>;
      };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        // user -> followers
        followers: {
          // sotr by createdAt desc
          orderBy: { createdAt: 'desc' },
          include: {
            // followers -> following(user)
            following: {
              include: {
                // following(user) is followed
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
        }
      }
    });
    return result;
  }
);

// [userId]/following.page.tsx
export const getUserFollowingList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findMany(query: Prisma.UserFindManyArgs): Promise<GetFollowingList>;
      };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        // user -> followings
        followings: {
          // sotr by createdAt desc
          orderBy: { createdAt: 'desc' },
          include: {
            // followings -> follower(user)
            follower: {
              include: {
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

export const createUser = depend(
  {
    prisma: prisma as unknown as {
      user: { create(query: Prisma.UserCreateArgs): Promise<User> };
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createUser: Prisma.UserUncheckedCreateInput
    createUser: Prisma.UserCreateInput
  ) => {
    const result = await prisma.user.create({
      data: createUser
    });
    return result;
  }
);

export const updateUser = depend(
  {
    prisma: prisma as unknown as {
      user: { update(query: Prisma.UserUpdateArgs): Promise<User> };
    }
  },
  async (
    { prisma },
    id: User['id'],
    // miyasan31:key1
    // updateUser: Prisma.UserUncheckedCreateInput
    updateUser: Prisma.UserUpdateInput
  ) => {
    const result = await prisma.user.update({
      where: {
        id: id
      },
      data: updateUser
    });
    return result;
  }
);

export const deleteUser = depend(
  {
    prisma: prisma as unknown as {
      user: { update(query: Prisma.UserDeleteArgs): Promise<User> };
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.update({
      where: {
        id: id
      }
    });
    return result;
  }
);

// const iconsDir = API_UPLOAD_DIR && path.resolve(API_UPLOAD_DIR, 'icons')

// const createIconURL = (dir: string, name: string) => {
//   return `${API_ORIGIN}/${dir}icons/${name}`
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getUserIconName = (_id: string) => {
//   return `user-icon`
// }

// export const getUserInfo = (id: string) => {
//   const iconName = getUserIconName(id)
//   return {
//     name: 'sample user',
//     icon:
//       iconsDir && fs.existsSync(path.resolve(iconsDir, iconName))
//         ? createIconURL('upload/', iconName)
//         : createIconURL('static/', `dummy.svg`)
//   }
// }

export const validateUser = (id: string, pass: string) => {
  return id === API_USER_ID && pass === API_USER_PASS;
};

// export const getUserInfoById = (id: string) => {
//   return { id, ...getUserInfo(id) }
// }

// export const changeIcon = async (id: string, iconFile: Multipart) => {
//   const iconName = getUserIconName(id)

//   if (!iconsDir) {
//     throw new Error('API_UPLOAD_DIR is not configured.')
//   }

//   await fs.promises.mkdir(iconsDir, { recursive: true })

//   await fs.promises.writeFile(
//     path.resolve(iconsDir, iconName),
//     await iconFile.toBuffer()
//   )

//   return {
//     id,
//     ...getUserInfo(id)
//   }
// }

// headerのtokenを使ってAuth0からユーザー情報を取得する
export const getUserInfo = async <T>(token?: string): Promise<T> => {
  const options = {
    url: `${FASTIFY_AUTH0_DOMAIN}userinfo`,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: token
    },
    json: true
  };
  return await new Promise((resolve, reject) => {
    httpsRequest(options)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
