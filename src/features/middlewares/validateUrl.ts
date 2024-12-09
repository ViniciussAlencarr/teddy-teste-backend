import { FastifyRequest, FastifyReply } from "fastify";

// utils
import { validateUrl } from "@utils/validateURL";

export const validateUrlMiddleware = (request: FastifyRequest, reply: FastifyReply, next: (url: string) => {}) => {
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
    
    return next(body.url)
}