import { handler } from './'

export default {
    method: 'GET',
    url: '/v1/health',
    handler,
    schema: {
        response: {
            200: {
                message: { type: 'string' }
            }
        }
    }
}