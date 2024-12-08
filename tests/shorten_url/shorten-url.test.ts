import { buildTestServer } from '../jest.setup';

// libs
import { buildFastify } from '../../src/lib/fastify'

// types
import { FastifyInstance } from 'fastify';
import TestAgent from 'supertest/lib/agent';

describe('Shorten URL - Encurtar URL', () => {
    let testAgent: TestAgent;
    let fastifyInstance: FastifyInstance;

    beforeAll(async () => {
        fastifyInstance = await buildFastify();
        testAgent = await buildTestServer(fastifyInstance);
    });

    // Após todos os testes, fechar o server
    afterAll(async () => {
        fastifyInstance.close()
    });

    test('A url é válida', async () => {
        const response = await testAgent
            .post('/v1/shorten-url')
            .send({
                url: 'https://google.com' // exemplo de url válida
            });

        const requestBody = (await response.request).body;

        expect(response.statusCode).toBe(200)
        expect(typeof response.body).toBe('object')
        expect(requestBody).toHaveProperty('status', 'success')
        expect(requestBody).toHaveProperty('data.shortenedUrl')
        // TODO: VALIDAR SE A URL FOI ENCURTADA COMO ESPERADO (PERANTE O ESCOPO)
        expect(requestBody.data.shortenedUrl).not.toBe('');

    })

    test('A url está vazia', async () => {
        const response = await testAgent
            .post('/v1/shorten-url')
            .send({
                url: ''
            });

        const requestBody = (await response.request).body;

        expect(response.statusCode).toBe(400)
        expect(typeof response.body).toBe('object')
        expect(requestBody).toHaveProperty('status', 'error')
        expect(requestBody).toHaveProperty('message', 'Campo URL obrigatório')
        expect(requestBody).toHaveProperty('data.message')
        expect(requestBody.data.message).toBe("campo 'url' não encontrado");
    })

    test('A url é inválida', async () => {
        const response = await testAgent
            .post('/v1/shorten-url')
            .send({
                url: 'exemplo-url-inválida'
            })
            .send({});

        const requestBody = (await response.request).body;

        expect(response.statusCode).toBe(400)
        expect(typeof response.body).toBe('object')
        expect(requestBody).toHaveProperty('status', 'error')
        expect(requestBody).toHaveProperty('message', 'A URL não é válida')
        expect(requestBody).toHaveProperty('data.url')
        expect(requestBody.data.url).not.toBe("");
    })

    test('O body não foi definido', async () => {
        const response = await testAgent
            .post('/v1/shorten-url')
            .send();

        const requestBody = (await response.request).body;

        expect(response.statusCode).toBe(400)
        expect(typeof response.body).toBe('object')
        expect(requestBody).toHaveProperty('message')
        expect(typeof requestBody.message).toBe('string')
    })
})