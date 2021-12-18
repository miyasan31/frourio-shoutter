import type { Prisma } from '$prisma/client'

export type Methods = {
  post: {
    // miyasan31:key1
    // reqBody: Prisma.FollowUncheckedCreateInput
    reqBody: Prisma.FollowCreateInput
    status: 201
  }
}
