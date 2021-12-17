import { defineController } from './$relay'
import { getUserFollowerList } from '$/service/user'

export default defineController(() => ({
  get: async ({ params }) => {
    const followerlist = await getUserFollowerList(params.userId)

    if (followerlist.length === 0) {
      return { status: 404 }
    }

    return { status: 200, body: followerlist }
  }
}))
