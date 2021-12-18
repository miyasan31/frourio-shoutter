import type { Prisma } from '$prisma/client'

export type Methods = {
  post: {
    // miyasan31:key1
    // reqBody: Prisma.LikeUncheckedCreateInput
    reqBody: Prisma.LikeCreateInput
    status: 201
  }
}
