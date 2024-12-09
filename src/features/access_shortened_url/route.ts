import { handler } from './'

// types
import { Route } from '@globalTypes/global'

export default {
    method: 'GET',
    url: '/:code',
    handler,
    schema: {
        response: {
            404: {
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