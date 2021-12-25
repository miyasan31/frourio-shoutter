import { getUserReplyList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserReplyList
  },
  ({ getUserReplyList }) => ({
    get: async ({ params }) => {
      const replylist = await getUserReplyList(params.userId);

      if (replylist.length === 0) {
        return { status: 404 };
      }

      return { status: 200, body: replylist };
    }
  })
);
