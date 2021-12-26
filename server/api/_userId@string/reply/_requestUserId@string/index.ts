import type { AuthHeader } from '$/types';
import { GetReplyList } from '$/types/user';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetReplyList;
    status: 200;
  };
};
