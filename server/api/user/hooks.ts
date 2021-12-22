// import { defineHooks } from './$relay';

// const cyan = '\u001b[36m';
// const reset = '\u001b[0m';

export type AdditionalRequest = {
  userInfo: any;
};

// export default defineHooks(() => {
//   return {
//     onRequest: async (request, reply) => {
//       const res = await request.jwtVerify().catch((err) => {
//         console.info(cyan + request + reset);
//         console.error(cyan + request.user + reset);
//         reply.send(err);
//       });
//       console.info(cyan + res + reset);
//       return res;
//     }
//   };
// });

// app.addHook('onRequest', async (request, reply) => {
//   try {
//     const res = await request.jwtVerify();
//     console.info(res);
//     return res;
//   } catch (err) {
//     reply.send(err);
//   }
// });
