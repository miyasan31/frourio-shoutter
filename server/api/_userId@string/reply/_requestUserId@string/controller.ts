import { getUserReplyList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserReplyList
  },
  ({ getUserReplyList }) => ({
    get: async ({ params }) => {
      const replylist = await getUserReplyList(
        params.userId,
        params.requestUserId
      );

      return { status: 200, body: replylist };
    }
  })
);
