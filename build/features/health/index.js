"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (request, reply) => {
    return reply.status(200).send({ message: 'OK' });
};
exports.handler = handler;
