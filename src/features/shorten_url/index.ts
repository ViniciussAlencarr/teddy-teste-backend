import { FastifyRequest, FastifyReply } from 'fastify'

// utils
import { validateUrl } from '@utils/validateURL'

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { url: string };

    if (!body?.url) {
        return reply.status(400).send({
            status: 'error',
            message: 'Campo URL obrigatório',
            data: {
                message: "campo 'url' não encontrado"
            }
        })
    }

    if (!validateUrl(body.url)) {
        return reply.status(400).send({
            status: 'error',
            message: 'A URL não é válida',
            data: {
                url: body.url
            }
        })
    }

    return reply.status(200).send({
        status: 'success',
        message: 'URL encurtada com sucesso!',
        data: {
            shortenedUrl: 'asdasd'
        }
    })
}