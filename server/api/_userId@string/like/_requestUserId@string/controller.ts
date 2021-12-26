import { getUserLikeList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserLikeList
  },
  ({ getUserLikeList }) => ({
    get: async ({ params }) => {
      const likelist = await getUserLikeList(
        params.userId,
        params.requestUserId
      );
      return { status: 200, body: likelist };
    }
  })
);
