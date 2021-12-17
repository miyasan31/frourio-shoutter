import { defineController } from './$relay'
import { getTweetList, createTweet } from '$/service/tweet'

// @/api/tweet
export default defineController(() => ({
  // not used
  get: async () => {
    const tweetlist = await getTweetList()
    if (tweetlist.length === 0) {
      return { status: 404 }
    }
    return { status: 200, body: tweetlist }
  },

  post: async ({ body }) => {
    const tweet = await createTweet(body)
    if (!tweet) {
      return { status: 400 }
    }
    return { status: 201, body: tweet }
  }
}))
