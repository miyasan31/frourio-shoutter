import { depend } from 'velona'
import fs from 'fs'
import path from 'path'
import { Multipart } from 'fastify-multipart'
import {
  API_ORIGIN,
  API_USER_ID,
  API_USER_PASS,
  API_UPLOAD_DIR
} from './envValues'
import { PrismaClient } from '@prisma/client'
import type { Prisma, User } from '$prisma/client'
import {
  GetAllUser,
  GetUser,
  GetTweetList,
  GetReplyList,
  GetLikeList,
  GetRetweetList,
  GetFollowerList,
  GetFollowingList
} from '$/types/user'

const prisma = new PrismaClient()

export const getUserList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetAllUser> }
    }
  },
  async ({ prisma }) => {
    const result = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            followers: true,
            followings: true
          }
        }
      }
    })
    return result
  }
)

export const getUser = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findUnique(query: Prisma.UserFindUniqueArgs): Promise<GetUser>
      }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        _count: {
          select: {
            followers: true,
            followings: true
          }
        }
      }
    })
    return result
  }
)

// [userId]/index.page.tsx
export const getUserTweetList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetTweetList> }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        tweets: {
          include: {
            _count: {
              select: {
                replies: true,
                retweets: true,
                likes: true
              }
            }
          }
        }
      }
    })
    return result
  }
)

// [userId]/reply.page.tsx
export const getUserReplyList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetReplyList> }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        replies: true
      }
    })
    return result
  }
)

// [userId]/like.page.tsx
export const getUserLikeList = depend(
  {
    prisma: prisma as unknown as {
      user: { findMany(query: Prisma.UserFindManyArgs): Promise<GetLikeList> }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        likes: {
          include: {
            tweet: {
              include: {
                user: true,
                _count: {
                  select: {
                    replies: true,
                    retweets: true,
                    likes: true
                  }
                }
              }
            }
          }
        }
      }
    })
    return result
  }
)

// [userId]/retweet.page.tsx
export const getUserRetweetList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findMany(query: Prisma.UserFindManyArgs): Promise<GetRetweetList>
      }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        retweets: {
          include: {
            tweet: {
              include: {
                user: true,
                _count: {
                  select: {
                    replies: true,
                    retweets: true,
                    likes: true
                  }
                }
              }
            }
          }
        }
      }
    })
    return result
  }
)

// [userId]/follower.page.tsx
export const getUserFollowerList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findMany(query: Prisma.UserFindManyArgs): Promise<GetFollowerList>
      }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        followers: {
          include: {
            following: true
          }
        }
      }
    })
    return result
  }
)

// [userId]/following.page.tsx
export const getUserFollowingList = depend(
  {
    prisma: prisma as unknown as {
      user: {
        findMany(query: Prisma.UserFindManyArgs): Promise<GetFollowingList>
      }
    }
  },
  async ({ prisma }, id: User['id']) => {
    const result = await prisma.user.findMany({
      where: {
        id: id
      },
      include: {
        followings: {
          include: {
            follower: true
          }
        }
      }
    })
    return result
  }
)

export const createUser = depend(
  {
    prisma: prisma as unknown as {
      user: { create(query: Prisma.UserCreateArgs): Promise<User> }
    }
  },
  async (
    { prisma },
    // miyasan31:key1
    // createUser: Prisma.UserCreateInput
    createUser: Prisma.UserUncheckedCreateInput
  ) => {
    const result = await prisma.user.create({
      data: createUser
    })
    return result
  }
)

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
  return id === API_USER_ID && pass === API_USER_PASS
}

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
