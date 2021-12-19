import type { Reply, Prisma } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: Reply | null
    status: 200
  }

  patch: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.ReplyUncheckedUpdateInput
    reqBody: Prisma.ReplyUpdateInput

    status: 204
  }

  delete: {
    reqHeaders: AuthHeader

    status: 204
  }
}
