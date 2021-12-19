import { defineController } from './$relay'
import { getUser, updateUser, deleteUser } from '$/service/user'

export default defineController(
  {
    getUser,
    updateUser,
    deleteUser
  },
  ({ getUser, updateUser, deleteUser }) => ({
    get: async ({ params }) => {
      const user = await getUser(params.userId)
      if (!user) {
        return { status: 404 }
      }
      return { status: 200, body: await user }
    },

    patch: async ({ body, params }) => {
      const user = await updateUser(params.userId, body)
      if (!user) {
        return { status: 400 }
      }
      return { status: 204 }
    },

    delete: async ({ params }) => {
      const user = await deleteUser(params.userId)
      if (!user) {
        return { status: 400 }
      }
      return { status: 204 }
    }
  })
)
