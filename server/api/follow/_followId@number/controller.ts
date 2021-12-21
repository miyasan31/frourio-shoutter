import { deleteFollow } from '$/service/follow';

import { defineController } from './$relay';

export default defineController(
  {
    deleteFollow
  },
  ({ deleteFollow }) => ({
    delete: async ({ params }) => {
      const follow = await deleteFollow(params.followId);
      if (!follow) {
        return { status: 400 };
      }
      return { status: 204 };
    }
  })
);
