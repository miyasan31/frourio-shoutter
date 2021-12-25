import { User } from '@prisma/client';

import type { AuthHeader } from '$/types';
import type { GetTweetDetail } from '$/types/tweet';
import type { Prisma } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;
    userInfo: User;

    resBody: GetTweetDetail;
    status: 200;
  };

  patch: {
    reqHeaders: AuthHeader;
    // miyasan31:key1
    // reqBody: Prisma.TweetUncheckedUpdateInput
    reqBody: Prisma.TweetUpdateInput;

    status: 204;
  };

  delete: {
    reqHeaders: AuthHeader;

    status: 204;
  };
};
