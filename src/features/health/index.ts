import { FastifyRequest, FastifyReply } from 'fastify'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: 'OK' })
}