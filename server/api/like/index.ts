import type { Prisma } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  post: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.LikeUncheckedCreateInput
    reqBody: Prisma.LikeCreateInput

    status: 201
  }
}
