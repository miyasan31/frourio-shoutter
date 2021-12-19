import type { Like, User, Tweet } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

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
