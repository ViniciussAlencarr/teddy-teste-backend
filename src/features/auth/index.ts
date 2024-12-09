import { FastifyRequest, FastifyReply } from 'fastify';
import { Prisma } from "@prisma/client";

// libs
import { comparePassword } from '@libs/argon2'
import { sign } from '@libs/jwt'

// model
import { prisma } from '@libs/prisma';

// types
import { BodyParams } from './types';

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as  BodyParams;

    const user = await prisma.user.findFirst({ where: { email, deletedAt: null } })

    const isValid = user && await comparePassword(user.password, password)

    if (!isValid) {
        return reply.code(401).send({
            status: 'error',
            message: 'Credenciais inválidas'
        })
    }

    try {
        const accessToken = await sign({ id: user.id })

        return reply.code(200).send({ accessToken })
    } catch (err) {
        console.log(err)
        return reply.status(500).send({
            status: 'error',
            message: 'Ocorreu um problema interno'
        })
    }
}