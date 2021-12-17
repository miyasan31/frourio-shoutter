import type { Follow, User } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      followings: (Follow & {
        follower: User
      })[]
    })[]
    status: 200
  }
}
