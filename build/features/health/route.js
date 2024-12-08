"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
exports.default = {
    method: 'GET',
    url: '/v1/health',
    handler: _1.handler,
    schema: {
        response: {
            200: {
                message: { type: 'string' }
            }
        }
    }
};
