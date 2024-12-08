import { handler } from './index'
import { ResponseProperties, Route } from '@globalTypes/global'

export default {
    method: 'POST',
    url: '/v1/shorten-url',
    handler,
    schema: {
        body: {
            type: 'object',
            properties: {
                url: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            shortenedUrl: { type: 'string' }
                        }
                    },
                } as ResponseProperties
            },
            400: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                            url: { type: 'string' }
                        }
                    },
                } as ResponseProperties
            },
            500: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    message: { type: 'string' },
                } as ResponseProperties
            }
        }
    }
} as Route;