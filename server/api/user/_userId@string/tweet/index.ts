import type { Tweet, User } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      tweets: Tweet[]
    })[]
    status: 200
  }
}
