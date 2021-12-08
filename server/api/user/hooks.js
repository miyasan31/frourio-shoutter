import { defineHooks } from './$relay';
export default defineHooks(() => ({
    onRequest: (request, reply) => request.jwtVerify().catch((err) => reply.send(err))
}));
