import { FastifyRequest, FastifyReply } from 'fastify';

// libs
import { hash } from '@libs/argon2'
import { prisma } from '@libs/prisma';

// types
import { BodyParams } from './types';

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, name, password } = request.body as BodyParams;

    const findedUser = await prisma.user.findFirst({ where: { email } });

    const wasDeleted = findedUser && findedUser.deletedAt !== null

    if (findedUser && !wasDeleted) {
        return reply.status(400).send({
            status: 'error',
            message: 'Usuário já existente'
        })
    }

    let user;

    try {
        const binaryPassword = await hash(password)

        // atualiza caso tenha sido deletado
        user = wasDeleted ?
            await prisma.user.update({
                where: { email },
                data: {
                    name,
                    email,
                    password: binaryPassword,
                    updatedAt: new Date(),
                    deletedAt: null
                }
            }) :
            // cria caso não tenha sido deletado
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: binaryPassword,
                }
            });

        return reply.status(201).send({ id: user.id.toString() })
    } catch (err) {
        console.log(err)
        return reply.status(500).send({
            status: 'error',
            message: 'Ocorreu um problema interno'
        })
    }
}