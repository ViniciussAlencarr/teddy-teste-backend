import { handler } from './'

// types
import { Route } from '@globalTypes/global'
import { UserProperties } from '../types';

export default {
    method: 'GET',
    url: '/v1/users',
    handler,
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                        name: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                        deletedAt: { type: 'string' },
                    } as UserProperties
                }
            },
            400: {
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