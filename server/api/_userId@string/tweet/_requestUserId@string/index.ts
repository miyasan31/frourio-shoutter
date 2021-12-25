import type { AuthHeader } from '$/types';
import { GetTweetList } from '$/types/user';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetTweetList;
    status: 200;
  };
};
