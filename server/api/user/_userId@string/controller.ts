import { deleteUser, updateUser } from '$/service/user';

import { defineController } from './$relay';

export default defineController(
  {
    updateUser,
    deleteUser
  },
  ({ updateUser, deleteUser }) => ({
    patch: async ({ body, params }) => {
      const user = await updateUser(params.userId, body);
      if (!user) {
        return { status: 400 };
      }
      return { status: 204 };
    },

    delete: async ({ params }) => {
      const user = await deleteUser(params.userId);
      if (!user) {
        return { status: 400 };
      }
      return { status: 204 };
    }
  })
);
