import { getFollowingUserTweetList } from '$/service/home'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ params }) => {
    const tweetlist = await getFollowingUserTweetList(params.userId)

    if (tweetlist.length === 0) {
      return { status: 404 }
    }

    return { status: 200, body: tweetlist }
  }
}))
