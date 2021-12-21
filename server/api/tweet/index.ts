import type { AuthHeader } from '$/types';
import type { GetTweet } from '$/types/tweet';
import type { Prisma, Tweet } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetTweet[];
    status: 200;
  };

  post: {
    reqHeaders: AuthHeader;
    // miyasan31:key1
    // reqBody: Prisma.TweetUncheckedCreateInput
    reqBody: Prisma.TweetCreateInput;

    resBody: Tweet;
    status: 201;
  };
};
