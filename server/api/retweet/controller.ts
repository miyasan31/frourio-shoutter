import { createRetweet } from '$/service/retweet';

import { defineController } from './$relay';

export default defineController(
  {
    createRetweet
  },
  ({ createRetweet }) => ({
    post: async ({ body }) => {
      const retweet = await createRetweet(body);
      if (!retweet) {
        return { status: 400 };
      }
      return { status: 201, body: retweet };
    }
  })
);
