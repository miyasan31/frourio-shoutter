import type { AuthHeader } from '$/types';
import type { Retweet, Tweet, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      retweets: (Retweet & {
        tweet: Tweet & {
          user: User;
        };
      })[];
    })[];
    status: 200;
  };
};
