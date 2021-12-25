import { getUserLikeList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserLikeList
  },
  ({ getUserLikeList }) => ({
    get: async ({ params }) => {
      const likelist = await getUserLikeList(params.userId);
      if (likelist.length === 0) {
        return { status: 404 };
      }
      return { status: 200, body: likelist };
    }
  })
);
