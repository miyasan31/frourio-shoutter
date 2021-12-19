import type { Prisma } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  post: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.FollowUncheckedCreateInput
    reqBody: Prisma.FollowCreateInput

    status: 201
  }
}
