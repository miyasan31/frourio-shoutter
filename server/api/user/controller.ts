import { createUser, getUserList } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    getUserList,
    createUser
  },
  ({ getUserList, createUser }) => ({
    get: async () => {
      const userList = await getUserList();
      if (userList.length === 0) {
        return { status: 400 };
      }
      return { status: 200, body: userList };
    },

    post: async ({ body }) => {
      const user = await createUser(body);
      if (!user) {
        return { status: 400 };
      }
      return { status: 201, body: user };
    }
  })
);
