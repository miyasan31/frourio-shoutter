import type { Prisma } from '$prisma/client'
import type { GetTweetDetail } from '$/types/tweet'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: GetTweetDetail
    status: 200
  }

  patch: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.TweetUncheckedUpdateInput
    reqBody: Prisma.TweetUpdateInput

    status: 204
  }

  delete: {
    reqHeaders: AuthHeader

    status: 204
  }
}
