import { User } from '@prisma/client';

import type { AuthHeader } from '$/types';
import { GetHome, GetMyTweet } from '$/types/home';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;
    userInfo: User;

    resBody: {
      currentUser: GetMyTweet;
      followingUser: GetHome;
    };
    status: 200;
  };
};
