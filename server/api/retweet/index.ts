import type { Prisma } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  post: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.RetweetUncheckedCreateInput
    reqBody: Prisma.RetweetCreateInput

    status: 201
  }
}
