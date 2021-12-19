import type { User, Prisma } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

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

  patch: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.UserUncheckedUpdateInput
    reqBody: Prisma.UserUpdateInput

    status: 204
  }

  delete: {
    reqHeaders: AuthHeader

    status: 204
  }
}
