import type { Prisma } from '$prisma/client'

export type Methods = {
  post: {
    reqBody: Prisma.RetweetCreateInput
    status: 204
  }
}
