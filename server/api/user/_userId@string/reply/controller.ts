import { defineController } from './$relay'
import { getUserReplyList } from '$/service/user'

export default defineController(() => ({
  get: async ({ params }) => {
    const replylist = await getUserReplyList(params.userId)

    if (replylist.length === 0) {
      return { status: 404 }
    }

    return { status: 200, body: replylist }
  }
}))
