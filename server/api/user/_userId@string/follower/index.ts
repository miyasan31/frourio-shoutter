import type { Follow, User } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: (User & {
      followers: (Follow & {
        following: User
      })[]
    })[]
    status: 200
  }
}
