import type { Tweet, Prisma } from '$prisma/client'

export type Methods = {
  get: {
    resBody:
      | (Tweet & {
          _count: {
            replies: number
            retweets: number
            likes: number
          }
        })
      | null
    status: 200
  }

  patch: {
    reqBody: Prisma.TweetUpdateInput
    status: 204
  }

  delete: {
    status: 204
  }
}
