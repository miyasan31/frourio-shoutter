import type { AuthHeader } from '$/types';
import { GetRetweetList } from '$/types/user';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetRetweetList;
    status: 200;
  };
};
