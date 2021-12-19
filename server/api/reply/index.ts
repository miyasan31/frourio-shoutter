import type { Prisma, Reply } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: Reply[]
    status: 200
  }

  post: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.ReplyUncheckedCreateInput
    reqBody: Prisma.ReplyCreateInput

    status: 204
  }
}
