import { FastifyRequest, FastifyReply } from 'fastify';

// libs
import { prisma } from '@libs/prisma';

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const params = request.params as { id: string; };

        if (!params?.id) return reply.status(404).send({
            status: 'error',
            message: 'Rota não encontrada'
        })

        const { id } = params;
        const userId = parseInt(id)

        const userExist = await prisma.user.count({ where: { id: userId, deletedAt: null } }) !== 0;

        if (!userExist) return reply.status(404).send({
            status: 'error',
            message: 'Não foi possivel atualizar o usuário'
        })

        const updatedUser = await prisma.user.update({
            where: { id: userId, deletedAt: null },
            data: {
                deletedAt: new Date(),
            },
        })

        return reply.status(200).send({
            status: 'success',
            message: 'Deletado com sucesso',
            data: updatedUser
        })
    } catch (err) {
        console.log(err)
        return reply.status(500).send({
            status: 'error',
            message: 'Ocorreu um problema interno'
        })
    }
}