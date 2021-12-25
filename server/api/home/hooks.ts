import { getSignupUserCheck, getUserInfo } from '$/service/user';
import type { RequestUserInfo } from '$/types';
import type { User } from '$prisma/client';

import { defineHooks } from './$relay';

export type AdditionalRequest = {
  userInfo: User;
};

export default defineHooks(
  { getSignupUserCheck },
  ({ getSignupUserCheck }) => ({
    onRequest: async (request) => {
      // GET以外は何もしない
      if (request.method !== 'GET') return;
      // paramsがある場合は何もしない
      if (request.params) return;

      const token = request?.headers.authorization;
      const user = await getUserInfo<RequestUserInfo>(token).then((res) => res);
      const userData = await getSignupUserCheck(user.email);
      request.userInfo = userData;
      return userData;
    }
  })
);
