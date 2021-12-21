import type { AuthHeader } from '$/types';
import type { Tweet, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      tweets: Tweet[];
    })[];
    status: 200;
  };
};
