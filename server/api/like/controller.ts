import { createLike } from '$/service/like';

import { defineController } from './$relay';

export default defineController(
  {
    createLike
  },
  ({ createLike }) => ({
    post: async ({ body }) => {
      const like = await createLike(body);
      if (!like) {
        return { status: 400 };
      }
      return { status: 201, body: like };
    }
  })
);
