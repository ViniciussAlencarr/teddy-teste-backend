import { FastifyRequest, FastifyReply } from "fastify";

// libs
import { prisma } from "@libs/prisma";
import { startRedisClient } from "@libs/redis";

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const redisClient = await startRedisClient()

    const { code } = request.params as { code: string };

    const urlRef = await prisma.uRL.findFirst({ where: { urlCode: code } })

    const memUrlCode = await redisClient.get('urlCode');
    const memOriginalurl = memUrlCode && await redisClient.get(memUrlCode);

    if (urlRef) {
        await prisma.uRL.update({
            where: { id: urlRef.id },
            data: {
                clicks: urlRef.clicks + 1,
                lastAccess: new Date()
            }
        })

        return reply.redirect(urlRef.originalUrl);
    }

    if (memOriginalurl) {
        await redisClient.disconnect();
        return reply.redirect(memOriginalurl);
    }

    return reply.status(404).send({
        status: 'error',
        message: 'Url não encontrada'
    })



    // contabilizar os clicks
    // contabilizar ultimo acesso
    // pegar url original 
    // fazer o redirect
    //   const originalUrl = urlDatabase.get(shortUrlId);

    //   if (!originalUrl) {
    //     return reply.status(404).send({ error: 'URL não encontrada!' });
    //   }

    //   // Redirecionando para a URL original
    //   return reply.redirect(originalUrl);

}