import type { Prisma } from '$prisma/client'

export type Methods = {
  post: {
    reqBody: Prisma.LikeCreateInput
    status: 204
  }
}
