import { getUserRetweetList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserRetweetList
  },
  ({ getUserRetweetList }) => ({
    get: async ({ params }) => {
      const retweetlist = await getUserRetweetList(params.userId);
      if (retweetlist.length === 0) {
        return { status: 404 };
      }
      return { status: 200, body: retweetlist };
    }
  })
);
