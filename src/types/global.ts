// types
import { FastifyReply, FastifyRequest } from "fastify";

export interface Route {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'UPDATE';
    url: string;
    preHandler?: (request: FastifyRequest, reply: FastifyReply, next: () => {}) => unknown;
    handler: (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>;
    schema: {
        response?: unknown;
        request?: unknown;
    }
}

export interface ResponseProperties {
    status: { type: 'string' };
    message: { type: 'string' };
    data?: any;
}