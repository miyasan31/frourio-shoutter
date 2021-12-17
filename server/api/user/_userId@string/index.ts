import type { User } from '$prisma/client'

export type Methods = {
  get: {
    resBody:
      | (User & {
          _count: {
            followers: number
            followings: number
          }
        })
      | null
    status: 200
  }
}
