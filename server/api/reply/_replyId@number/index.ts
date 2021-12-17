import type { Reply, Prisma } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Reply | null
    status: 200
  }

  patch: {
    reqBody: Prisma.ReplyUpdateInput
    status: 204
  }

  delete: {
    status: 204
  }
}
