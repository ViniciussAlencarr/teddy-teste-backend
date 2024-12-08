"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const loaders_1 = require("./features/loaders");
require("./paths");
const fastify = (0, fastify_1.default)({ logger: process.env.NODE_ENV !== 'production' });
fastify.register(cors_1.default, {
    credentials: true,
    origin: ['*']
});
const start = async () => {
    try {
        await (0, loaders_1.swaggerLoadder)().load(fastify);
        await (0, loaders_1.routerLoader)().load(fastify);
        await fastify.listen({ port: 3131, host: '0.0.0.0' });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
