import type { AuthHeader } from '$/types';
import type { Prisma, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      _count: {
        followers: number;
        followings: number;
      };
    })[];
    status: 200;
  };

  post: {
    reqHeaders: AuthHeader;
    // miyasan31:key1
    // reqBody: Prisma.UserUncheckedCreateInput
    reqBody: Prisma.UserCreateInput;

    resBody: User;
    status: 201;
  };
};
