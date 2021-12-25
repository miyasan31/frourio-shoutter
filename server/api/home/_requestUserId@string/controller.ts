import { getFollowingUserTweetList } from '$/service/home';

import { defineController } from './$relay';

export default defineController(
  {
    getFollowingUserTweetList
  },
  ({ getFollowingUserTweetList }) => ({
    get: async ({ params }) => {
      const tweetlist = await getFollowingUserTweetList(params.requestUserId);
      if (
        tweetlist.followingUser.length === 0 &&
        tweetlist.currentUser.length === 0
      ) {
        return { status: 404 };
      }
      return { status: 200, body: tweetlist };
    }
  })
);
