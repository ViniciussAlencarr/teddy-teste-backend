import Fastify from 'fastify'
import cors from '@fastify/cors'

import {
  routerLoader,
  swaggerLoadder
} from '../features/loaders';

// separando para facilitar ao usar juntamente com o Jest;
export const buildFastify = async () => {
  const fastify = Fastify({ logger: process.env.NODE_ENV === 'development' });

  fastify.register(cors, {
    credentials: true,
    origin: ['*']
  })

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  await swaggerLoadder().load(fastify)
  await routerLoader().load(fastify)

  return fastify
}