import Fastify, { FastifyServerFactory } from 'fastify';
import fastifyAuth0Verify from 'fastify-auth0-verify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import fastifyStatic from 'fastify-static';
import path from 'path';

import server from '$/$server';
import {
  API_BASE_PATH,
  API_UPLOAD_DIR,
  FASTIFY_AUTH0_AUDIENCE,
  FASTIFY_AUTH0_DOMAIN,
  FASTIFY_AUTH0_SECRET
} from '$/service/envValues';

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory });
  app.register(helmet);
  app.register(cors);

  if (API_UPLOAD_DIR) {
    app.after(() => {
      app.register(fastifyStatic, {
        root: path.resolve(__dirname, API_UPLOAD_DIR),
        prefix: '/upload/',
        decorateReply: false
      });
    });
  }

  app.register(fastifyAuth0Verify, {
    domain: FASTIFY_AUTH0_DOMAIN,
    secret: FASTIFY_AUTH0_SECRET,
    audience: FASTIFY_AUTH0_AUDIENCE
  });

  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  server(app, { basePath: API_BASE_PATH });

  return app;
};
