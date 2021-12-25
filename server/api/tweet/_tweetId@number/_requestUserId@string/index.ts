import type { AuthHeader } from '$/types';
import type { GetTweetDetail } from '$/types/tweet';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetTweetDetail;
    status: 200;
  };
};
