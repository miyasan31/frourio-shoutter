import { defineController } from './$relay'
import { getUserRetweetList } from '$/service/user'

export default defineController(() => ({
  get: async ({ params }) => {
    const retweetlist = await getUserRetweetList(params.userId)

    if (retweetlist.length === 0) {
      return { status: 404 }
    }

    return { status: 200, body: retweetlist }
  }
}))
