import { FastifyRequest, FastifyReply } from "fastify";

// features
import { isAuthRoute } from "@features/shared/validateAuth";

// libs
import { prisma } from "@libs/prisma";

// middlewares
import { validateUrlMiddleware } from '@middlewares/validateUrl'

// utils
import { urlShortener } from "@utils/urlShortener";
import { startRedisClient } from "@libs/redis";

export const urlShortenedBy = async (request: FastifyRequest, reply: FastifyReply) => {
    const headerToken = request.headers?.authorization;
    let authInfo!: { user: any; token?: string; };

    const redisClient = await startRedisClient()

    if (!!headerToken) {
        authInfo = await isAuthRoute(request, reply)
    }

    const validatedContent = await validateUrlMiddleware(request, reply, async (url: string) => {
        // caso exista um token e seja válido 
        const { shortenedUrl, code } = urlShortener(url)

        if (authInfo) {
            await prisma.uRL.create({
                data: {
                    shortenedUrl,
                    originalUrl: url,
                    urlCode: code,
                    lastAccess: null,
                    userId: authInfo.user.id,
                }
            })
        } else {
            await redisClient.set('urlCode', code);
            await redisClient.set(code, url);
        }

        return { url, shortenedUrl }
    })

    request.body = validatedContent;
}