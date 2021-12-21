import type { AuthHeader } from '$/types';
import type { Follow, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      followers: (Follow & {
        following: User;
      })[];
    })[];
    status: 200;
  };
};
