import type { Like, User, Tweet } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      likes: (Like & {
        tweet: Tweet & {
          user: User
        }
      })[]
    })[]
    status: 200
  }
}
