import supertest from 'supertest';

import { FastifyInstance } from 'fastify/types/instance';

export const buildTestServer = async (fastifyApp: FastifyInstance) => {
    await fastifyApp.ready()

    const testServer = supertest(fastifyApp.server)

    return testServer
};