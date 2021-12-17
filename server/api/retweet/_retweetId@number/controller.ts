import { defineController } from './$relay'
import { deleteRetweet } from '$/service/retweet'

export default defineController(
  {
    deleteRetweet
  },
  ({ deleteRetweet }) => ({
    delete: async ({ params }) => {
      const retweet = await deleteRetweet(params.retweetId)
      if (!retweet) {
        return { status: 400 }
      }
      return { status: 204 }
    }
  })
)
