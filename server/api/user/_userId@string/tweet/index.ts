import type { Tweet, User } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: (User & {
      tweets: Tweet[]
    })[]
    status: 200
  }
}
