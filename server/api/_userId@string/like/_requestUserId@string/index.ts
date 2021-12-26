import type { AuthHeader } from '$/types';
import { GetLikeList } from '$/types/user';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetLikeList;
    status: 200;
  };
};
