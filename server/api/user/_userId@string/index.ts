import type { User } from '$prisma/client'
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
}
