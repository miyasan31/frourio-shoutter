import type { Reply, User } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      replies: Reply[]
    })[]
  }
}
