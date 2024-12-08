"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (request, reply) => {
    return reply.status(201).send({ msg: 'OK' });
};
exports.handler = handler;
