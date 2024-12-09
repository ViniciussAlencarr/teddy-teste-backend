import { FastifyRequest, FastifyReply } from 'fastify';

// libs
import { prisma } from '@libs/prisma';

// types
import { BodyParams } from './types';

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const params = request.params as { id: string; };
        const { clicks, originalUrl, urlCode, } = request.body as BodyParams;

        if (!params?.id) return reply.status(404).send({
            status: 'error',
            message: 'Rota não encontrada'
        })

        const { id } = params;
        const urlId = parseInt(id)

        const urlExist = await prisma.uRL.count({ where: { id: urlId } }) !== 0;

        if (!urlExist) return reply.status(404).send({
            status: 'error',
            message: 'Não foi possivel atualizar a URL'
        })

        const updatedUrl = await prisma.uRL.update({
            where: { id: urlId },
            data: {
                clicks: clicks as any,
                originalUrl,
                urlCode,
                updatedAt: new Date(),
                deletedAt: null
            },
        })

        return reply.status(200).send({
            status: 'success',
            message: 'URL atualizada com sucesso!',
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