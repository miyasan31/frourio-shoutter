import { getUserFollowingList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserFollowingList
  },
  ({ getUserFollowingList }) => ({
    get: async ({ params }) => {
      const followinglist = await getUserFollowingList(params.userId);
      if (followinglist.length === 0) {
        return { status: 404 };
      }
      return { status: 200, body: followinglist };
    }
  })
);
