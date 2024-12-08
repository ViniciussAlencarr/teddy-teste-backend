

import './paths'

import { buildFastify } from '@libs/fastify'

const start = async () => {
  try {
    const fastify = await buildFastify()

    await fastify.listen({ port: 3131, host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();