
import { createClient } from 'redis';

export const startRedisClient = async () => {
    const client = await createClient()
        .on('error', err => console.log('Ocorreu um erro ao iniciar o Redis', err))
        .connect();
    return client
}