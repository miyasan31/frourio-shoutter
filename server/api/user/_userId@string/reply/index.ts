import type { Reply, User } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: (User & {
      replies: Reply[]
    })[]
    status: 200
  }
}
