import { defineController } from './$relay'
import { createFollow } from '$/service/follow'

export default defineController(() => ({
  post: async ({ body }) => {
    const follow = await createFollow(body)

    if (!follow) {
      return { status: 400 }
    }

    return { status: 204 }
  }
}))
