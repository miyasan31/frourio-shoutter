import { defineController } from './$relay'
import { getUser } from '$/service/user'

export default defineController(
  {
    getUser
  },
  ({ getUser }) => ({
    get: async ({ params }) => {
      const user = await getUser(params.userId)
      if (!user) {
        return { status: 404 }
      }
      return { status: 200, body: await user }
    }
  })
)
