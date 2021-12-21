import type { AuthHeader } from '$/types';
import type { Like, Tweet, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      likes: (Like & {
        tweet: Tweet & {
          user: User;
        };
      })[];
    })[];
    status: 200;
  };
};
