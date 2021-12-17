import type { Prisma } from '$prisma/client'

export type Methods = {
  post: {
    reqBody: Prisma.FollowCreateInput
    status: 201
  }
}
