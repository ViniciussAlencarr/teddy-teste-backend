import { FastifyRequest, FastifyReply } from 'fastify'

// utils
import { startRedisClient } from '@libs/redis'


export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const { url, shortenedUrl } = request.body as { url: string, shortenedUrl: string };

    return reply.status(200).send({
        status: 'success',
        message: 'URL encurtada com sucesso!',
        data: {
            shortenedUrl,
            originalUrl: url,
        }
    })
}