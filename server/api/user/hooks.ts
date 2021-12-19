// import { defineHooks } from './$relay'

// const cyan = '\u001b[36m'
// const reset = '\u001b[0m'

// export type AdditionalRequest = {
//   user: {
//     id: string
//   }
// }

// export default defineHooks(() => {
//   return {
//     onRequest: async (request, reply) => {
//       const res = await request.jwtVerify().catch((err) => {
//         console.error(cyan + err + reset)
//         reply.send(err)
//       })
//       console.info(cyan + res + reset)
//       return res
//     }
//   }
// })

// app.addHook('onRequest', async (request, reply) => {
//   try {
//     const res = await request.jwtVerify()
//     console.info(res)
//     return res
//   } catch (err) {
//     reply.send(err)
//   }
// })
