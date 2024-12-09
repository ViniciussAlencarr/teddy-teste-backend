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
        const urlId = parseInt(id)

        const urlExist = await prisma.uRL.count({ where: { id: urlId, deletedAt: null } }) !== 0;

        if (!urlExist) return reply.status(404).send({
            status: 'error',
            message: 'Não foi possivel atualizar a URL'
        })

        const updatedUrl = await prisma.uRL.update({
            where: { id: urlId, deletedAt: null },
            data: {
                deletedAt: new Date(),
            },
        })

        return reply.status(200).send({
            status: 'success',
            message: 'Deletado com sucesso',
            data: updatedUrl
        })
    } catch (err) {
        console.log(err)
        return reply.status(500).send({
            status: 'error',
            message: 'Ocorreu um problema interno'
        })
    }
}