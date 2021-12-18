import type { Prisma } from '$prisma/client'

export type Methods = {
  post: {
    // miyasan31:key1
    // reqBody: Prisma.RetweetUncheckedCreateInput
    reqBody: Prisma.RetweetCreateInput
    status: 201
  }
}
