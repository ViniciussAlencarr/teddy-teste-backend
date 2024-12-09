import { FastifyRequest, FastifyReply } from 'fastify';

// libs
import { prisma } from '@libs/prisma';

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId } = request.query as { userId: number };

        const urls = await prisma.uRL.findMany({ where: { userId, deletedAt: null } })

        return reply.status(200).send(urls)
    } catch (err) {
        console.log(err)
        return reply.status(500).send({ message: 'Ocorreu um problema interno' })
    }
}