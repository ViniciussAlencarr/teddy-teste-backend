import { handler } from './index'

export default {
    method: 'POST',
    url: '/v1/shorten-url',
    handler,
    schema: {
        response: {
            201: {
                type: 'object',
                properties: {
                    ping: { type: 'string' }
                }
            }
        }
    }
}