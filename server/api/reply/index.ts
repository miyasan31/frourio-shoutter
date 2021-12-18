import type { Prisma, Reply } from '$prisma/client'

export type Methods = {
  get: {
    resBody: Reply[]
    status: 200
  }

  post: {
    // miyasan31:key1
    // reqBody: Prisma.ReplyUncheckedCreateInput
    reqBody: Prisma.ReplyCreateInput
    status: 204
  }
}
