import type { Follow, User } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      followers: (Follow & {
        following: User
      })[]
    })[]
  }
}
