import { createFollow } from '$/service/follow';

import { defineController } from './$relay';

export default defineController(
  {
    createFollow
  },
  ({ createFollow }) => ({
    post: async ({ body }) => {
      const follow = await createFollow(body);
      if (!follow) {
        return { status: 400 };
      }
      return { status: 201, body: follow };
    }
  })
);
