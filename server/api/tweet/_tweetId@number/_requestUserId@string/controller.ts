import { getTweet } from '$/service/tweet';

import { defineController } from './$relay';

// @/api/tweet/:id/:userId
export default defineController(
  {
    getTweet
  },
  ({ getTweet }) => ({
    get: async ({ params }) => {
      const tweet = await getTweet(params.tweetId, params.requestUserId);
      if (!tweet) {
        return { status: 404 };
      }
      return { status: 200, body: tweet };
    }
  })
);
