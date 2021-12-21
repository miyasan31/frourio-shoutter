import { deleteRetweet } from '$/service/retweet';

import { defineController } from './$relay';

export default defineController(
  {
    deleteRetweet
  },
  ({ deleteRetweet }) => ({
    delete: async ({ params }) => {
      const retweet = await deleteRetweet(params.retweetId);
      if (!retweet) {
        return { status: 400 };
      }
      return { status: 204 };
    }
  })
);
