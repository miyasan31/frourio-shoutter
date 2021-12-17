import { getUserTweetList } from '$/service/user'
import { defineController } from './$relay'

export default defineController(
  {
    getUserTweetList
  },
  ({ getUserTweetList }) => ({
    get: async ({ params }) => {
      const tweetlist = await getUserTweetList(params.userId)
      if (tweetlist.length === 0) {
        return { status: 404 }
      }
      return { status: 200, body: tweetlist }
    }
  })
)
