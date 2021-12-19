import type { Follow, User } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: (User & {
      followings: (Follow & {
        follower: User
      })[]
    })[]
    status: 200
  }
}
