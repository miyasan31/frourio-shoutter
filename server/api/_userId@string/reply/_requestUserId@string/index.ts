import type { AuthHeader } from '$/types';
import type { Reply, User } from '$prisma/client';

export type Methods = {
  get: {
    reqHeaders: AuthHeader;

    resBody: (User & {
      replies: Reply[];
    })[];
    status: 200;
  };
};
