import { defineController } from './$relay'
import { getReply, updateReply, deleteReply } from '$/service/reply'

export default defineController(() => ({
  get: async ({ params }) => {
    const reply = await getReply(params.replyId)

    if (!reply) {
      return { status: 404 }
    }

    return { status: 200, body: await reply }
  },

  patch: async ({ body, params }) => {
    const reply = await updateReply(params.replyId, body)

    if (!reply) {
      return { status: 400 }
    }

    return { status: 204 }
  },

  delete: async ({ params }) => {
    const reply = await deleteReply(params.replyId)

    if (!reply) {
      return { status: 400 }
    }

    return { status: 204 }
  }
}))
