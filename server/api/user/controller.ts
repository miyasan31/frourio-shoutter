import { defineController } from './$relay'
import { createUser, getUserList } from '$/service/user'

export default defineController(() => ({
  get: async () => {
    const userList = await getUserList()

    if (userList.length === 0) {
      return { status: 400 }
    }

    return { status: 201, body: userList }
  },
  post: async ({ body }) => {
    const user = await createUser(body)

    if (!user) {
      return { status: 400 }
    }

    return { status: 201, body: user }
  }
}))
