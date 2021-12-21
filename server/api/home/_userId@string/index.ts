import type { AuthHeader } from '$/types';
import { GetHome } from '$/types/home';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: GetHome;
    status: 200;
  };
};
