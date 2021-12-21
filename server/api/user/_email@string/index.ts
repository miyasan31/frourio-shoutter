import { User } from '@prisma/client';

import type { AuthHeader } from '$/types';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: {
      user: User | null;
    };
    status: 200;
  };
};
