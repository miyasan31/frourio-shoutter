import type { AuthHeader } from '$/types';
import type { Follow, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      followings: (Follow & {
        follower: User;
      })[];
    })[];
    status: 200;
  };
};
