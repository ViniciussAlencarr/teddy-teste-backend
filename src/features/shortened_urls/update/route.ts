import { handler } from '.'

import { isAuthRoute as preHandler } from '@features/shared/validateAuth';

// types
import { Route } from '@globalTypes/global'

export default {
    method: 'PUT',
    url: '/v1/shortened-url/:id',
    preHandler,
    handler,
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            userId: { type: 'number' },
                            originalUrl: { type: 'string' },
                            urlCode: { type: 'string' },
                            clicks: { type: 'number' },
                            lastAccess: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                            deletedAt: { type: 'string' }
                        }
                    }
                }
            },
            400: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                }
            },
            404: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                }
            },
            401: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        }
    }
} as Route; 