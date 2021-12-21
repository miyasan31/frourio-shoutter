import type { AuthHeader } from '$/types';

export type Methods = {
  delete: {
    reqHeaders: AuthHeader;

    status: 204;
  };
};
