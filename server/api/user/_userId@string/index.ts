import type { Prisma } from '$prisma/client'
import type { AuthHeader } from '$/types'

export type Methods = {
  patch: {
    reqHeaders: AuthHeader
    // miyasan31:key1
    // reqBody: Prisma.UserUncheckedUpdateInput
    reqBody: Prisma.UserUpdateInput

    status: 204
  }

  delete: {
    reqHeaders: AuthHeader

    status: 204
  }
}
