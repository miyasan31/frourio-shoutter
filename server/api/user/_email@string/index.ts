import type { AuthHeader } from '$/types'
import { User } from '@prisma/client'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: {
      user: User | null
    }
    status: 200
  }
}
