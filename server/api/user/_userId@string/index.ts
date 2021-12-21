import type { AuthHeader } from '$/types';
import type { Prisma } from '$prisma/client';

export type Methods = {
  patch: {
    reqHeaders: AuthHeader;
    // miyasan31:key1
    // reqBody: Prisma.UserUncheckedUpdateInput
    reqBody: Prisma.UserUpdateInput;

    status: 204;
  };

  delete: {
    reqHeaders: AuthHeader;

    status: 204;
  };
};
