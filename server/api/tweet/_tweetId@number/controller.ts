import { deleteTweet, getTweet, updateTweet } from '$/service/tweet';
import { getSignupUserCheck, getUserInfo } from '$/service/user';
import type { RequestUserInfo } from '$/types';
import type { User } from '$prisma/client';

import { defineController, defineHooks } from './$relay';

export type AdditionalRequest = {
  userInfo: User;
};

// tokenからuserを取得する
export const hooks = defineHooks(() => ({
  onRequest: async (request, _reply, done) => {
    // GET以外は何もしない
    if (request.method !== 'GET') return;

    const token = request?.headers.authorization;
    const user = await getUserInfo<RequestUserInfo>(token).then((res) => res);
    const userData = await getSignupUserCheck(user.email);
    request.userInfo = userData;
    done();
  }
}));

// @/api/tweet/:id
export default defineController(
  {
    getTweet,
    updateTweet,
    deleteTweet
  },
  ({ getTweet, updateTweet, deleteTweet }) => ({
    get: async ({ params, userInfo }) => {
      const tweet = await getTweet(params.tweetId, userInfo.id);
      if (!tweet) {
        return { status: 404 };
      }
      return { status: 200, body: tweet };
    },

    patch: async ({ params, body }) => {
      const tweet = await updateTweet(params.tweetId, body);
      if (!tweet) {
        return { status: 400 };
      }
      return { status: 204 };
    },

    delete: async ({ params }) => {
      const tweet = await deleteTweet(params.tweetId);
      if (!tweet) {
        return { status: 400 };
      }
      return { status: 204 };
    }
  })
);
