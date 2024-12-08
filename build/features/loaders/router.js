"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLoader = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = __importDefault(require("node:url"));
const glob_1 = require("glob");
const routerLoader = () => {
    return {
        async load(fastify) {
            const isProd = process.env.NODE_ENV === 'production';
            const routesPath = node_path_1.default.resolve(node_path_1.default.dirname(''), (isProd ? 'build' : 'src'), 'features', `**/*route.${isProd ? 'js' : 'ts'}`);
            const routes = await (0, glob_1.glob)(routesPath, {
                windowsPathsNoEscape: true
            });
            for (const route of routes) {
                const urlRoute = node_url_1.default.pathToFileURL(route);
                const routeDefinitition = await Promise.resolve(`${urlRoute.pathname}`).then(s => __importStar(require(s)));
                fastify.route(routeDefinitition.default);
            }
        }
    };
};
exports.routerLoader = routerLoader;
