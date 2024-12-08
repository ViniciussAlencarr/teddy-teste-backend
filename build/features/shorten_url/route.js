"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
exports.default = {
    method: 'POST',
    url: '/v1/shorten-url',
    handler: index_1.handler,
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
};
