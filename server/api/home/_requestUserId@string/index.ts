import type { AuthHeader } from '$/types';
import { GetHome, GetMyTweet } from '$/types/home';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: {
      currentUser: GetMyTweet;
      followingUser: GetHome;
    };
    status: 200 | 404;
  };
};
