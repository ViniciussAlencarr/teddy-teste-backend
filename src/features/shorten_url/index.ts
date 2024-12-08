import { FastifyRequest, FastifyReply } from 'fastify'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(201).send({ msg: 'OK' })
}