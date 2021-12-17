import type { User, Prisma } from '$prisma/client'

export type Methods = {
  get: {
    resBody: (User & {
      _count: {
        followers: number
        followings: number
      }
    })[]
    status: 200
  }

  post: {
    reqBody: Prisma.UserCreateInput
    resBody: User
    status: 201
  }
}

// import type { AuthHeader, UserInfo } from '$/types'
// import type { ReadStream } from 'fs'

// export type Methods = {
//   get: {
//     reqHeaders: AuthHeader
//     resBody: UserInfo
//   }

//   post: {
//     reqHeaders: AuthHeader
//     reqFormat: FormData
//     reqBody: { icon: File | ReadStream }
//     resBody: UserInfo
//   }
// }
