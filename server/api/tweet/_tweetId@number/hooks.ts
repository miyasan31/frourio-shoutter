import { getSignupUserCheck, userInfo } from '$/service/user';
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
      const token = request?.headers.authorization;
      const user = await userInfo<RequestUserInfo>(token).then((res) => res);
      const userData = await getSignupUserCheck(user.email);
      request.userInfo = userData;
      return userData;
    }
  })
);
