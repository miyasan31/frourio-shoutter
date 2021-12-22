import { getSignupUserCheck } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getSignupUserCheck
  },
  ({ getSignupUserCheck }) => ({
    get: async ({ params }) => {
      const user = await getSignupUserCheck(params.email);
      if (!user) {
        return {
          body: { user: null },
          status: 200
        };
      }
      return {
        body: { user: user },
        status: 200
      };
    }
  })
);
