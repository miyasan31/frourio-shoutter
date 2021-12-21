import { deleteReply, getReply, updateReply } from '$/service/reply';

import { defineController } from './$relay';

// @/api/reoly/:id
export default defineController(
  {
    getReply,
    updateReply,
    deleteReply
  },
  ({ getReply, updateReply, deleteReply }) => ({
    get: async ({ params }) => {
      const reoly = await getReply(params.replyId);
      if (!reoly) {
        return { status: 404 };
      }
      return { status: 200, body: reoly };
    },

    patch: async ({ body, params }) => {
      const reoly = await updateReply(params.replyId, body);
      if (!reoly) {
        return { status: 400 };
      }
      return { status: 204 };
    },

    delete: async ({ params }) => {
      const reoly = await deleteReply(params.replyId);
      if (!reoly) {
        return { status: 400 };
      }
      return { status: 204 };
    }
  })
);
