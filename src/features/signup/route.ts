import { handler } from './'

// types
import { Route } from '@globalTypes/global'

export default {
    method: 'POST',
    url: '/v1/signup',
    handler,
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                name: { type: 'string' },
                password: { type: 'string' }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
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