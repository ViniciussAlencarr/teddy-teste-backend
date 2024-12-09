import { isAuthRoute as preHandler } from '@features/shared/validateAuth';
import { handler } from './'

// types
import { Route } from '@globalTypes/global'
import { UrlProperties } from '../types';

export default {
    method: 'GET',
    url: '/v1/shortened-urls',
    preHandler,
    handler,
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        userId: { type: 'number' },
                        clicks: { type: 'number' },
                        createdAt: { type: 'string' },
                        originalUrl: { type: 'string' },
                        shortenedUrl: { type: 'string' },
                        lastAccess: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                    } as UrlProperties
                }
            },
            401: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
} as Route; 