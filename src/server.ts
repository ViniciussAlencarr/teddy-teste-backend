import Fastify from 'fastify'
import cors from '@fastify/cors'
import {
  routerLoader,
  swaggerLoadder
} from './features/loaders';

import './paths'

const fastify = Fastify({ logger: process.env.NODE_ENV !== 'production' });

fastify.register(cors, { 
  credentials: true,
  origin: ['*']
})

const start = async () => {
  try {
    await swaggerLoadder().load(fastify)
    await routerLoader().load(fastify)

    await fastify.listen({ port: 3131, host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();