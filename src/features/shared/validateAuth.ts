// types
import { FastifyReply, FastifyRequest } from "fastify";

import { validateToken } from '@libs/jwt'
import { prisma } from "@libs/prisma";

export const isAuthRoute = async (request: FastifyRequest, reply: FastifyReply) => {
    const headerToken = request.headers?.authorization;
    const token = headerToken?.split('Bearer ')?.[1] as string;

    const decoded = await validateToken(token) as any;

    // valida se o usuário associao ao token ainda existe
    const user = await prisma.user.findFirst({ where: { id: decoded?.id, deletedAt: null } })
    
    const isAuth = user && decoded
    
    if (!isAuth) return reply.status(401).send({ message: 'Token inválido' });

    request.query = { userId: user.id }

    return { token, user }

}

// const rawToken = request.headers?.authorization
//   const tokenParts = rawToken.split('Bearer ')
//   const accessToken = tokenParts?.[1]

//   const payload = await verify(accessToken)

//   console.log({ payload })

//   if (!payload) {
//     return reply.code(401)
//       .send({
//         error: 'Invalid token'
//       })
//   }