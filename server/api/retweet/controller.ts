import { defineController } from './$relay'
import { createRetweet } from '$/service/retweet'

export default defineController(() => ({
  post: async ({ body }) => {
    const retweet = await createRetweet(body)

    if (!retweet) {
      return { status: 400 }
    }

    return { status: 204 }
  }
}))
