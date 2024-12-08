"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerLoadder = swaggerLoadder;
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
function swaggerLoadder() {
    return {
        async load(fastify) {
            await fastify.register(require('@fastify/swagger'), {
                openapi: {
                    info: {
                        title: 'CodeInit APIFY',
                        description: 'Sua descricao aqui',
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
            });
            await fastify.register(swagger_ui_1.default, {
                routePrefix: '/v1/docs',
                uiConfig: {
                    docExpansion: 'full',
                    deepLinking: false
                },
                uiHooks: {
                    onRequest: function (_, _reply, next) { next(); },
                    preHandler: function (_, _reply, next) { next(); }
                },
                staticCSP: true,
                transformStaticCSP: (header) => header,
                transformSpecification: (swaggerObject, _request, _reply) => { return swaggerObject; },
                transformSpecificationClone: true,
            });
        }
    };
}
