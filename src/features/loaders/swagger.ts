import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

export function swaggerLoadder() {
    return {
        async load(fastify: FastifyInstance) {
            await fastify.register(require('@fastify/swagger'), {
                openapi: {
                    info: {
                        title: 'Teddy Desafio Back-end',
                        description: 'API Desafio Back-end',
                        version: '1.0'
                    },
                    schemes: ['http', 'https'],
                    consumes: ['application/json'],
                    produces: ['application/json'],
                    components: {
                        securitySchemes: {
                            bearerAuth: {
                                type: 'http',
                                scheme: 'bearer',
                                bearerFormat: 'JWT',
                                schemeLabel: 'bearerAuth'
                            }
                        }
                    }
                },
                exposeRoute: true
            })

            await fastify.register(fastifySwaggerUi, {
                routePrefix: '/v1/docs',
                uiConfig: {
                    docExpansion: 'full',
                    deepLinking: false
                },
                uiHooks: {
                    onRequest: function (_, _reply, next) { next() },
                    preHandler: function (_, _reply, next) { next() }
                },
                staticCSP: true,
                transformStaticCSP: (header) => header,
                transformSpecification: (swaggerObject, _request, _reply) => { return swaggerObject },
                transformSpecificationClone: true,
            })
        }
    }
}