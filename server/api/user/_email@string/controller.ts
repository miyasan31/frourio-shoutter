import { defineController } from './$relay'
import { getSignUpUserCheck } from '$/service/user'

export default defineController(
  {
    getSignUpUserCheck
  },
  ({ getSignUpUserCheck }) => ({
    get: async ({ params }) => {
      const user = await getSignUpUserCheck(params.email)
      if (!user) {
        return {
          body: { user: null },
          status: 200
        }
      }
      return {
        body: { user: user },
        status: 200
      }
    }
  })
)
