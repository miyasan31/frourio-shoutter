import { deleteLike } from '$/service/like';

import { defineController } from './$relay';

export default defineController(
  {
    deleteLike
  },
  ({ deleteLike }) => ({
    delete: async ({ params }) => {
      const like = await deleteLike(params.likeId);
      if (!like) {
        return { status: 400 };
      }
      return { status: 204 };
    }
  })
);
