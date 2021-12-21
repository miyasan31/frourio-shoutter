import { getUserFollowerList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserFollowerList
  },
  ({ getUserFollowerList }) => ({
    get: async ({ params }) => {
      const followerlist = await getUserFollowerList(params.userId);
      if (followerlist.length === 0) {
        return { status: 404 };
      }
      return { status: 200, body: followerlist };
    }
  })
);
