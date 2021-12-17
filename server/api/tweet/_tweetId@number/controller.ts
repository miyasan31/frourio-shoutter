import { defineController } from './$relay'
import { getTweet, updateTweet, deleteTweet } from '$/service/tweet'

// @/api/tweet/:id
export default defineController(
  {
    getTweet,
    updateTweet,
    deleteTweet
  },
  ({ getTweet, updateTweet, deleteTweet }) => ({
    get: async ({ params }) => {
      const tweet = await getTweet(params.tweetId)
      if (!tweet) {
        return { status: 404 }
      }
      return { status: 200, body: tweet }
    },

    patch: async ({ body, params }) => {
      const tweet = await updateTweet(params.tweetId, body)
      if (!tweet) {
        return { status: 400 }
      }
      return { status: 204 }
    },

    delete: async ({ params }) => {
      const tweet = await deleteTweet(params.tweetId)
      if (!tweet) {
        return { status: 400 }
      }
      return { status: 204 }
    }
  })
)
