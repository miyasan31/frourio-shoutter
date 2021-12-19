import { GetHome } from '$/types/home'
import type { AuthHeader } from '$/types'

export type Methods = {
  get: {
    reqHeaders: AuthHeader

    resBody: GetHome
    status: 200
  }
}
