import type { Prisma, Reply } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Reply[]
    status: 200
  }

  post: {
    reqBody: Prisma.ReplyCreateInput
    status: 204
  }
}
