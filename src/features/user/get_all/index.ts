import { FastifyRequest, FastifyReply } from 'fastify';

// libs
import { prisma } from '@libs/prisma';

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await prisma.user.findMany({ where: { deletedAt: null } })

        return reply.status(200).send(users)
    } catch (err) {
        console.log(err)
        return reply.status(500).send({
            status: 'error',
            message: 'Ocorreu um problema interno'
        })
    }
}