import { handler } from './'

// types
import { Route } from '@globalTypes/global'

export default {
    method: 'POST',
    url: '/v1/signin',
    handler,
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    accessToken: { type: 'string' }
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